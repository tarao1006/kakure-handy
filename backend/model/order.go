package model

import (
	"fmt"
	"time"
)

const ORDER_STATUS_ORDERED int64 = 1
const ORDER_STATUS_SERVED int64 = 2
const ORDER_STATUS_CANCELLED int64 = 3
const ORDER_STATUS_PENDING int64 = 4

type Order struct {
	ID            int64     `json:"id"`
	TableID       int64     `json:"table_id"`
	StaffID       int64     `json:"staff_id"`
	Quantity      int64     `json:"quantity"`
	ParentOrderID int64     `json:"parent_order_id"`
	CreatedAt     time.Time `json:"created_at"`
	Item          Item      `json:"item"`
	Status        Status    `json:"status"`
}

type OrderDTO struct {
	ID               int64     `db:"id"`
	TableID          int64     `db:"table_id"`
	StaffID          int64     `db:"staff_id"`
	Quantity         int64     `db:"quantity"`
	ParentOrderID    int64     `db:"parent_order_id"`
	CreatedAt        time.Time `db:"created_at"`
	ItemID           int64     `db:"item_id"`
	ItemName         string    `db:"item_name"`
	CategoryID       int64     `db:"item_category_id"`
	CategoryName     string    `db:"item_category_name"`
	CategoryTypeID   int64     `db:"item_category_type_id"`
	CategoryTypeName string    `db:"item_category_type_name"`
	Price            int64     `db:"item_price"`
	StatusID         int64     `db:"status_id"`
	Status           string    `db:"status"`
}

type OrderParam struct {
	ID            int64 `json:"id"`
	TableID       int64
	StaffID       int64
	ParentOrderID int64
	StatusID      int64 `json:"status_id"`
	ItemID        int64 `json:"item_id"`
	Quantity      int64 `json:"quantity"`
}

type TableIsEndedError struct {
	TableID int64
}

func (e TableIsEndedError) Error() string {
	return fmt.Sprintf("table id %d is ended", e.TableID)
}

type IsNotCourseError struct{}

func (e IsNotCourseError) Error() string {
	return "valid only for course"
}

func ConvertToOrder(order OrderDTO) Order {
	return Order{
		ID:            order.ID,
		TableID:       order.TableID,
		StaffID:       order.StaffID,
		Quantity:      order.Quantity,
		ParentOrderID: order.ParentOrderID,
		CreatedAt:     order.CreatedAt,
		Item: Item{
			ID:   order.ItemID,
			Name: order.ItemName,
			Category: Category{
				ID:               order.CategoryID,
				Name:             order.CategoryName,
				CategoryTypeID:   order.CategoryTypeID,
				CategoryTypeName: order.CategoryTypeName,
			},
			Price: order.Price,
		},
		Status: Status{
			ID:     order.StatusID,
			Status: order.Status,
		},
	}
}
