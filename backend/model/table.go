package model

import (
	"fmt"
	"time"
)

type Table struct {
	ID         int64     `json:"id"`
	IsReserved bool      `json:"is_reserved"`
	IsStarted  bool      `json:"is_started"`
	IsEnded    bool      `json:"is_ended"`
	StartAt    time.Time `json:"start_at"`
	EndAt      time.Time `json:"end_at"`
	Amount     int64     `json:"amount"`
	BillID     int64     `json:"bill_id"`
	Room       Room      `json:"room"`
	Orders     []Order   `json:"orders"`
}

type TableDTO struct {
	ID         int64     `db:"id"`
	RoomID     int64     `db:"room_id"`
	RoomName   string    `db:"room_name"`
	IsReserved bool      `db:"is_reserved"`
	IsStarted  bool      `db:"is_started"`
	IsEnded    bool      `db:"is_ended"`
	StartAt    time.Time `db:"start_at"`
	EndAt      time.Time `db:"end_at"`
	Amount     int64     `db:"amount"`
	BillID     int64     `db:"bill_id"`
}

type TableParam struct {
	ID          int64 `json:"id"`
	RoomID      int64 `json:"room_id"`
	PersonCount int64 `json:"person_count"`
}

type RoomUnavailableError struct {
	RoomName string
}

func (e RoomUnavailableError) Error() string {
	return fmt.Sprintf("%s is unavailable", e.RoomName)
}

type TableAlreadyEndedError struct {
	TableID int64
}

func (e TableAlreadyEndedError) Error() string {
	return fmt.Sprintf("table id %d has already been ended", e.TableID)
}

type BillDoesNotExistError struct {
	TableID int64
}

func (e BillDoesNotExistError) Error() string {
	return fmt.Sprintf("table id %d have not paid a bill yet", e.TableID)
}

func ConvertToTable(table TableDTO, orders []Order) Table {
	return Table{
		ID:         table.ID,
		IsReserved: table.IsReserved,
		IsStarted:  table.IsStarted,
		IsEnded:    table.IsEnded,
		StartAt:    table.StartAt,
		EndAt:      table.EndAt,
		Amount:     table.Amount,
		BillID:     table.BillID,
		Room: Room{
			ID:   table.RoomID,
			Name: table.RoomName,
		},
		Orders: orders,
	}
}
