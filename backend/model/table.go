package model

import (
	"fmt"
	"time"
)

// Table is a struct of dinner_table.
type Table struct {
	ID              int64     `db:"id" json:"id"`
	RoomName        string    `db:"room_name" json:"room_name"`
	IsEnded         bool      `db:"is_ended" json:"is_ended"`
	StartAt         time.Time `db:"start_at" json:"start_at"`
	EndAt           time.Time `db:"end_at" json:"end_at"`
	Amount          int64     `db:"amount" json:"amount"`
	ValidBillExists bool      `db:"valid_bill_exists" json:"valid_bill_exists"`
	LatestBillID    int64     `db:"latest_bill_id" json:"latest_bill_id"`
	Orders          []Order   `json:"orders"`
}

// TableParam stores API request body.
type TableParam struct {
	ID     int64 `json:"id"`
	RoomID int64 `json:"room_id"`
}

// RoomUnavailableError is raised if room is unavailable.
type RoomUnavailableError struct {
	RoomName string
}

func (e RoomUnavailableError) Error() string {
	return fmt.Sprintf("%s is unavailable", e.RoomName)
}

// TableAlreadyEndedError is raised if table has already been ended.
type TableAlreadyEndedError struct {
	TableID int64
}

func (e TableAlreadyEndedError) Error() string {
	return fmt.Sprintf("table id %d has already been ended", e.TableID)
}

// BillDoesNotExistError is raised if table has already been ended.
type BillDoesNotExistError struct {
	TableID int64
}

func (e BillDoesNotExistError) Error() string {
	return fmt.Sprintf("bill does not exist")
}
