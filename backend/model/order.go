package model

import (
	"database/sql"
	"fmt"
	"time"
)

type Order struct {
	ID             int64     `json:"id"`
	TableID        int64     `json:"table_id"`
	StaffID        int64     `json:"staff_id"`
	Quantity       int64     `json:"quantity"`
	CourseProgress int64     `json:"course_progress"`
	CreatedAt      time.Time `json:"created_at"`
	Item           Item      `json:"item"`
	Status         Status    `json:"status"`
}

type OrderDTO struct {
	ID               int64         `db:"id"`
	TableID          int64         `db:"table_id"`
	StaffID          int64         `db:"staff_id"`
	Quantity         int64         `db:"quantity"`
	CreatedAt        time.Time     `db:"created_at"`
	CourseProgress   sql.NullInt64 `db:"course_progress"`
	ItemID           int64         `db:"item_id"`
	ItemName         string        `db:"item_name"`
	CategoryID       int64         `db:"item_category_id"`
	CategoryName     string        `db:"item_category_name"`
	CategoryTypeID   int64         `db:"item_category_type_id"`
	CategoryTypeName string        `db:"item_category_type_name"`
	Price            int64         `db:"item_price"`
	StatusID         int64         `db:"status_id"`
	Status           string        `db:"status"`
}

type OrderParam struct {
	ID       int64 `json:"id"`
	TableID  int64
	StaffID  int64
	StatusID int64 `json:"status_id"`
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
	var courseProgress int64 = 0
	if order.CourseProgress.Valid {
		courseProgress = order.CourseProgress.Int64
	}
	return Order{
		ID:             order.ID,
		TableID:        order.TableID,
		StaffID:        order.StaffID,
		Quantity:       order.Quantity,
		CreatedAt:      order.CreatedAt,
		CourseProgress: courseProgress,
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
