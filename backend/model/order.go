package model

import (
	"fmt"
	"time"
)

type Order struct {
	ID        int64     `json:"id"`
	TableID   int64     `json:"table_id"`
	StaffID   int64     `json:"staff_id"`
	Quantity  int64     `json:"quantity"`
	CreatedAt time.Time `json:"created_at"`
	Item      Item      `json:"item"`
	Status    Status    `json:"status"`
}

type OrderDTO struct {
	ID            int64     `db:"id"`
	TableID       int64     `db:"table_id"`
	StaffID       int64     `db:"staff_id"`
	Quantity      int64     `db:"quantity"`
	CreatedAt     time.Time `db:"created_at"`
	ItemID        int64     `db:"item_id"`
	ItemName      string    `db:"item_name"`
	CategoryID    int64     `db:"category_id"`
	SubcategoryID int64     `db:"subcategory_id"`
	Price         int64     `db:"price"`
	StatusID      int64     `db:"status_id"`
	Status        string    `db:"status"`
}

type OrderParam struct {
	ID       int64 `json:"id"`
	TableID  int64
	StaffID  int64
	ItemID   int64 `json:"item_id"`
	Quantity int64 `json:"quantity"`
}

type TableIsEndedError struct {
	TableID int64
}

func (e TableIsEndedError) Error() string {
	return fmt.Sprintf("table id %d is ended", e.TableID)
}

func ConvertToOrder(order OrderDTO) Order {
	return Order{
		ID:        order.ID,
		TableID:   order.TableID,
		StaffID:   order.StaffID,
		Quantity:  order.Quantity,
		CreatedAt: order.CreatedAt,
		Item: Item{
			ID:            order.ItemID,
			Name:          order.ItemName,
			CategoryID:    order.CategoryID,
			SubcategoryID: order.SubcategoryID,
			Price:         order.Price,
		},
		Status: Status{
			ID:     order.StatusID,
			Status: order.Status,
		},
	}
}
