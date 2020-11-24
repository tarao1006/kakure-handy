package repository

import (
	"database/sql"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func AllTable(db *sqlx.DB) ([]model.Table, error) {
	tables := make([]model.TableDTO, 0)
	if err := db.Select(&tables, `
		SELECT id, is_ended, room_id, room_name, amount, bill_id, start_at, end_at FROM table_model
	`); err != nil {
		log.Print(err)
		return nil, err
	}

	res := make([]model.Table, 0)
	for _, table := range tables {
		orders, err := FindOrdersByTableID(db, table.ID)
		if err != nil {
			return nil, err
		}

		room := model.Room{
			ID:   table.RoomID,
			Name: table.RoomName,
		}

		res = append(res, model.Table{
			ID:      table.ID,
			IsEnded: table.IsEnded,
			StartAt: table.StartAt,
			EndAt:   table.EndAt,
			Amount:  table.Amount,
			Room:    room,
			Orders:  orders,
		})
	}

	return res, nil
}

func FindTableByID(db *sqlx.DB, ID int64) (*model.Table, error) {
	table := model.TableDTO{}
	if err := db.Get(&table, `
		SELECT id, room_name, is_ended, start_at, end_at, amount, valid_bill_exists, latest_bill_id FROM table_model WHERE id = ?
	`, ID); err != nil {
		log.Print(err)
		return nil, err
	}

	orders, err := FindOrdersByTableID(db, ID)
	if err != nil {
		return nil, err
	}

	room := model.Room{
		ID:   table.RoomID,
		Name: table.RoomName,
	}

	res := model.Table{
		ID:      table.ID,
		IsEnded: table.IsEnded,
		StartAt: table.StartAt,
		EndAt:   table.EndAt,
		Amount:  table.Amount,
		Room:    room,
		Orders:  orders,
	}

	return &res, nil
}

func EndTable(db *sqlx.Tx, ID int64) (result sql.Result, err error) {
	stmt, err := db.Prepare("UPDATE dinner_table SET is_ended = true WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	return stmt.Exec(ID)
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
