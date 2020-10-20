package model

import (
	"fmt"
	"time"
)

// Order is a struct of order.
type Order struct {
	ID        int64         `db:"id" json:"id"`
	TableID   int64         `db:"table_id" json:"table_id"`
	StaffID   int64         `db:"staff_id" json:"staff_id"`
	CreatedAt time.Time     `db:"created_at" json:"created_at"`
	Details   []OrderDetail `json:"details"`
}

// OrderParam stores API request body.
type OrderParam struct {
	ID      int64              `db:"id" json:"id"`
	TableID int64              `db:"table_id" json:"table_id"`
	StaffID int64              `db:"staff_id" json:"staff_id"`
	Details []OrderDetailParam `json:"details"`
}

// TableIsEndedError is raised if table is ended
type TableIsEndedError struct {
	TableID int64
}

func (e TableIsEndedError) Error() string {
	return fmt.Sprintf("table id %d is ended", e.TableID)
}
