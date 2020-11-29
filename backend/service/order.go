package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

type Order struct {
	db *sqlx.DB
}

func NewOrder(db *sqlx.DB) *Order {
	return &Order{db: db}
}

func (o *Order) Create(params []model.OrderParam) ([]model.Order, error) {
	table, err := repository.FindTableByID(o.db, params[0].TableID)
	if err != nil {
		return nil, err
	}

	if table.IsEnded {
		return nil, model.TableIsEndedError{TableID: params[0].TableID}
	}

	IDs := make([]int64, 0)
	if err := dbutil.TXHandler(o.db, func(tx *sqlx.Tx) error {
		for _, param := range params {
			result, err := repository.CreateOrder(tx, &param)
			if err != nil {
				return err
			}
			id, err := result.LastInsertId()
			if err != nil {
				return err
			}

			IDs = append(IDs, id)
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	res := make([]model.Order, 0)

	for _, id := range IDs {
		order, err := repository.FindOrderByID(o.db, id)
		if err != nil {
			return nil, err
		}
		res = append(res, *order)
	}

	return res, nil
}

func (o *Order) Update(param *model.OrderParam) (*model.Order, error) {
	table, err := repository.FindTableByID(o.db, param.TableID)
	if err != nil {
		return nil, err
	}

	if table.IsEnded {
		return nil, model.TableIsEndedError{TableID: param.TableID}
	}

	oldOrder, err := repository.FindOrderByID(o.db, param.ID)
	if err != nil {
		return nil, err
	}

	if param.StatusID == 1 && (oldOrder.Status.ID == 1 || oldOrder.Status.ID == 2) {
		return nil, errors.New("invalid operation")
	} else if param.StatusID == 2 && (oldOrder.Status.ID == 2 || oldOrder.Status.ID == 3) {
		return nil, errors.New("invalid operation")
	} else if param.StatusID == 3 && (oldOrder.Status.ID == 2 || oldOrder.Status.ID == 3) {
		return nil, errors.New("invalid operation")
	}

	if err := dbutil.TXHandler(o.db, func(tx *sqlx.Tx) error {

		_, err := repository.UpdateOrder(tx, param.ID, param.StatusID)
		if err != nil {
			return err
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	order, err := repository.FindOrderByID(o.db, param.ID)
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (o *Order) Next(ID int64) (*model.Order, error) {
	nowOrder, err := repository.FindOrderByID(o.db, ID)
	if err != nil {
		return nil, err
	}

	if nowOrder.Item.Category.CategoryTypeID != model.CATEGORY_COURSE_ID {
		return nil, errors.New("valid only for course")
	}

	if err := dbutil.TXHandler(o.db, func(tx *sqlx.Tx) error {

		_, err := repository.ProgressOrder(tx, ID, nowOrder.CourseProgress+1)
		if err != nil {
			return err
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	order, err := repository.FindOrderByID(o.db, ID)
	if err != nil {
		return nil, err
	}

	return order, nil
}
