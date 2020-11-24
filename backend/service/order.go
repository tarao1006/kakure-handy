package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// Order is a struct to manipulate database.
type Order struct {
	db *sqlx.DB
}

// NewOrder create new Order.
func NewOrder(db *sqlx.DB) *Order {
	return &Order{db: db}
}

// Create create new order.
func (o *Order) Create(params *model.OrderParam) (*model.Order, error) {

	table, err := repository.FindTableByID(o.db, params.TableID)
	if err != nil {
		return nil, err
	}

	if table.IsEnded {
		return nil, model.TableIsEndedError{TableID: params.TableID}
	}

	if err := dbutil.TXHandler(o.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateOrder(tx, params)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}

		params.ID = id

		for _, detail := range params.Details {
			detail.OrderID = id
			if _, err := repository.CreateOrderDetail(tx, &detail); err != nil {
				return err
			}
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	order, err := repository.FindOrderByID(o.db, params.ID)
	if err != nil {
		return nil, err
	}

	return order, nil
}
