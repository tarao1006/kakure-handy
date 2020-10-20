package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// Table is a struct to manipulate database.
type Table struct {
	db *sqlx.DB
}

// NewTable create new Table.
func NewTable(db *sqlx.DB) *Table {
	return &Table{db: db}
}

// Create create new record.
func (t *Table) Create(params *model.TableParam) (*model.Table, error) {
	tables, err := repository.AllTable(t.db)
	if err != nil {
		return nil, err
	}

	for _, table := range tables {
		room, err := repository.FindRoomByID(t.db, params.RoomID)
		if err != nil {
			return nil, err
		}

		if (table.RoomName == room.Name) && !table.IsEnded {
			return nil, model.RoomUnavailableError{RoomName: table.RoomName}
		}
	}

	if err := dbutil.TXHandler(t.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateTable(tx, params)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}

		params.ID = id

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed table insert transaction")
	}

	res, err := repository.FindTableByID(t.db, params)
	if err != nil {
		return nil, err
	}

	return res, nil
}

// End update `end_at` value of dinner_table.
func (t *Table) End(params *model.TableParam) (*model.Table, error) {
	table, err := repository.FindTableByID(t.db, params)
	if err != nil {
		return nil, err
	}

	if table.IsEnded {
		return nil, model.TableAlreadyEndedError{TableID: params.ID}
	}

	bill, err := repository.FindBillByTableID(t.db, params.ID)

	if err != nil {
		return nil, err
	}

	if bill == nil {
		return nil, model.BillDoesNotExistError{TableID: params.ID}
	}

	if err := dbutil.TXHandler(t.db, func(tx *sqlx.Tx) error {
		_, err := repository.UpdateTable(tx, params)
		if err != nil {
			return err
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed table update transaction")
	}

	res, err := repository.FindTableByID(t.db, params)
	if err != nil {
		return nil, err
	}

	return res, nil
}
