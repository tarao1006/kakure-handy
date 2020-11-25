package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func FindOrdersByTableID(db *sqlx.DB, tableID int64) ([]model.Order, error) {
	orders := make([]model.OrderDTO, 0)
	if err := db.Select(&orders, `
		SELECT id, table_id, staff_id, quantity, created_at, item_id, category_id, subcategory_id, item_name, price, status_id, status FROM order_model WHERE table_id = ? ORDER BY id
	`, tableID); err != nil {
		return nil, err
	}

	res := make([]model.Order, 0)
	for _, order := range orders {
		res = append(res, model.ConvertToOrder(order))
	}

	return res, nil
}

func FindOrderByID(db *sqlx.DB, ID int64) (*model.Order, error) {
	order := model.OrderDTO{}
	if err := db.Get(&order, `
		SELECT id, table_id, staff_id, created_at, order_detail_id, order_id, item_name, price, quantity, status FROM order_model WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}

	res := model.ConvertToOrder(order)

	return &res, nil
}

func CreateOrder(db *sqlx.Tx, param *model.OrderParam) (result sql.Result, err error) {
	stmt, err := db.Prepare("INSERT INTO cuisine_order (staff_id, table_id, item_id, quantity) VALUES (?,?,?,?)")
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(param.StaffID, param.TableID, param.ItemID, param.Quantity)
}

func UpdateOrder(db *sqlx.Tx, ID int64, statusID int64) (result sql.Result, err error) {
	stmt, err := db.Prepare(`UPDATE cuisine_order SET status_id = ? WHERE id = ?`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(statusID, ID)
}
