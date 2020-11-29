package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func FindOrdersByTableID(db *sqlx.DB, tableID int64) ([]model.Order, error) {
	orders := make([]model.OrderDTO, 0)
	if err := db.Select(&orders, `
		SELECT id, table_id, staff_id, quantity, created_at, course_progress, item_id, item_name, item_price, item_category_id, item_category_name, item_category_type_id, item_category_type_name, status_id, status FROM order_model WHERE table_id = ? ORDER BY id
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
	SELECT id, table_id, staff_id, quantity, created_at, course_progress, item_id, item_name, item_price, item_category_id, item_category_name, item_category_type_id, item_category_type_name, status_id, status FROM order_model WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}

	res := model.ConvertToOrder(order)

	return &res, nil
}

func CreateOrder(db *sqlx.Tx, param *model.OrderParam) (result sql.Result, err error) {
	var query string
	if model.IsCourse(param.ItemID) {
		query = "INSERT INTO cuisine_order (staff_id, table_id, item_id, quantity, course_progress) VALUES (?,?,?,?,1)"
	} else {
		query = "INSERT INTO cuisine_order (staff_id, table_id, item_id, quantity) VALUES (?,?,?,?)"
	}

	stmt, err := db.Prepare(query)
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

func ProgressOrder(db *sqlx.Tx, ID int64, progress int64) (result sql.Result, err error) {
	stmt, err := db.Prepare(`UPDATE cuisine_order SET course_progress = ? WHERE id = ?`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(progress, ID)
}
