package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// OrderDetail is a struct to manipulate database.
type OrderDetail struct {
	db *sqlx.DB
}

// NewOrderDetail create new Order.
func NewOrderDetail(db *sqlx.DB) *OrderDetail {
	return &OrderDetail{db: db}
}

// Update update the record.
func (o *OrderDetail) Update(params *model.OrderDetailParam) (*model.OrderDetail, error) {
	if err := dbutil.TXHandler(o.db, func(tx *sqlx.Tx) error {
		if _, err := repository.UpdateOrderDetail(tx, params); err != nil {
			return err
		}

		return nil
	}); err != nil {
		return nil, errors.Wrap(err, "failed order_detail update transaction")
	}

	res, err := repository.FindOrderDetailByID(o.db, params)
	if err != nil {
		return nil, err
	}

	return res, nil
}
