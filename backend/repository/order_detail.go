package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

// FindOrderDetailByID returns OrderDetail
func FindOrderDetailByID(db *sqlx.DB, params *model.OrderDetailParam) (*model.OrderDetail, error) {
	orderDetail := model.OrderDetail{}
	if err := db.Get(&orderDetail, `
		SELECT id, order_id, item_name, price, quantity, status FROM order_detail_model WHERE id = ?
	`, params.ID); err != nil {
		return nil, err
	}

	return &orderDetail, nil
}

// CreateOrderDetail creates new order_detail record.
func CreateOrderDetail(db *sqlx.Tx, params *model.OrderDetailParam) (result sql.Result, err error) {
	stmt, err := db.Prepare(`INSERT INTO order_detail (order_id, item_id, quantity) VALUES (?, ?, ?)`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(params.OrderID, params.ItemID, params.Quantity)
}

// UpdateOrderDetail update status_id.
func UpdateOrderDetail(db *sqlx.Tx, params *model.OrderDetailParam) (result sql.Result, err error) {
	stmt, err := db.Prepare(`UPDATE order_detail SET status_id = ? WHERE id = ?`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(params.StatusID, params.ID)
}
