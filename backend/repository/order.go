package repository

import (
	"database/sql"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func FindOrdersByTableID(db *sqlx.DB, tableID int64) ([]model.Order, error) {
	orders := make([]OrderDTO, 0)
	if err := db.Select(&orders, `
		SELECT id, table_id, staff_id, created_at, order_detail_id, order_id, item_name, price, quantity, status FROM order_model WHERE table_id = ? ORDER BY id
	`, tableID); err != nil {
		return nil, err
	}

	var previousID int64 = -1
	m := make(map[int64][]model.OrderDetail, 0)

	for _, order := range orders {
		if order.ID != previousID {
			m[order.ID] = make([]model.OrderDetail, 0)
			previousID = order.ID
		}

		m[order.ID] = append(m[order.ID], model.OrderDetail{
			ID:       order.OrderDetailID,
			OrderID:  order.OrderID,
			ItemName: order.ItemName,
			Price:    order.Price,
			Quantity: order.Quantity,
			Status:   order.Status,
		})
	}

	previousID = -1
	res := make([]model.Order, 0)
	for _, order := range orders {
		if order.ID != previousID {
			res = append(res, model.Order{
				ID:        order.ID,
				TableID:   order.TableID,
				StaffID:   order.StaffID,
				CreatedAt: order.CreatedAt,
				Details:   m[order.ID],
			})
			previousID = order.ID
		}
	}

	return res, nil
}

func FindOrderByID(db *sqlx.DB, ID int64) (*model.Order, error) {
	orders := make([]OrderDTO, 0)
	if err := db.Select(&orders, `
		SELECT id, table_id, staff_id, created_at, order_detail_id, order_id, item_name, price, quantity, status FROM order_model WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}

	details := make([]model.OrderDetail, 0)
	for _, order := range orders {
		details = append(details, model.OrderDetail{
			ID:       order.OrderDetailID,
			OrderID:  order.OrderID,
			ItemName: order.ItemName,
			Price:    order.Price,
			Quantity: order.Quantity,
			Status:   order.Status,
		})
	}

	order := model.Order{
		ID:        orders[0].ID,
		TableID:   orders[0].TableID,
		StaffID:   orders[0].StaffID,
		CreatedAt: orders[0].CreatedAt,
		Details:   details,
	}

	return &order, nil
}

// CreateOrder creates new order record.
func CreateOrder(db *sqlx.Tx, params *model.OrderParam) (result sql.Result, err error) {
	stmt, err := db.Prepare("INSERT INTO cuisine_order (staff_id, table_id) VALUES (?, ?)")
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(params.StaffID, params.TableID)
}

type OrderDTO struct {
	ID            int64     `db:"id"`
	TableID       int64     `db:"table_id"`
	StaffID       int64     `db:"staff_id"`
	CreatedAt     time.Time `db:"created_at"`
	OrderDetailID int64     `db:"order_detail_id"`
	OrderID       int64     `db:"order_id"`
	ItemName      string    `db:"item_name"`
	Price         int64     `db:"price"`
	Quantity      int64     `db:"quantity"`
	Status        string    `db:"status"`
}
