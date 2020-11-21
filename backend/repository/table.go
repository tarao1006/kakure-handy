package repository

import (
	"database/sql"
	"log"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

// AllTable get all tables information.
func AllTable(db *sqlx.DB) ([]model.Table, error) {
	tables := make([]tableDTO, 0)
	if err := db.Select(&tables, `
		SELECT id, room_name, is_ended, start_at, end_at, amount, bill_cnt, latest_bill_id FROM table_model
	`); err != nil {
		log.Print(err)
		return nil, err
	}

	res := make([]model.Table, 0)
	for _, table := range tables {
		orders, err := FindOrdersByTableID(db, &model.OrderParam{TableID: table.ID})
		if err != nil {
			return nil, err
		}

		res = append(res, model.Table{
			ID:           table.ID,
			RoomName:     table.RoomName,
			IsEnded:      table.IsEnded,
			StartAt:      table.StartAt,
			EndAt:        table.EndAt,
			Amount:       table.Amount,
			BillCount:    table.BillCount,
			LatestBillID: table.LatestBillID,
			Orders:       orders,
		})
	}

	return res, nil
}

// FindTableByID returns a Table found by id.
func FindTableByID(db *sqlx.DB, params *model.TableParam) (*model.Table, error) {
	table := tableDTO{}
	if err := db.Get(&table, `
		SELECT id, room_name, is_ended, start_at, end_at, amount, bill_cnt, latest_bill_id FROM table_model WHERE id = ?
	`, params.ID); err != nil {
		log.Print(err)
		return nil, err
	}

	orders, err := FindOrdersByTableID(db, &model.OrderParam{TableID: params.ID})
	if err != nil {
		return nil, err
	}

	res := model.Table{
		ID:           table.ID,
		RoomName:     table.RoomName,
		IsEnded:      table.IsEnded,
		StartAt:      table.StartAt,
		EndAt:        table.EndAt,
		Amount:       table.Amount,
		BillCount:    table.BillCount,
		LatestBillID: table.LatestBillID,
		Orders:       orders,
	}

	return &res, nil
}

func UpdateTable(db *sqlx.Tx, params *model.TableParam) (result sql.Result, err error) {
	stmt, err := db.Prepare("UPDATE dinner_table SET is_ended = true WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(params.ID)
}

// CreateTable create new dinner_table record.
func CreateTable(db *sqlx.Tx, params *model.TableParam) (result sql.Result, err error) {
	stmt, err := db.Prepare("INSERT INTO dinner_table (room_id) VALUES (?)")
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(params.RoomID)
}

type tableDTO struct {
	ID           int64     `db:"id"`
	RoomName     string    `db:"room_name"`
	IsEnded      bool      `db:"is_ended"`
	StartAt      time.Time `db:"start_at"`
	EndAt        time.Time `db:"end_at"`
	Amount       int64     `db:"amount"`
	BillCount    int64     `db:"bill_cnt"`
	LatestBillID int64     `db:"latest_bill_id"`
}
