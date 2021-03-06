package service

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

type Table struct {
	db *sqlx.DB
}

func NewTable(db *sqlx.DB) *Table {
	return &Table{db: db}
}

func (t *Table) Create(params *model.TableParam) (*model.Table, error) {
	tables, err := repository.AllTable(t.db)
	if err != nil {
		return nil, err
	}

	occupiedRoomIDs := model.OccupiedRoomIDs(tables)
	availableRoomIDBit := model.AvailableRoomIDBit(occupiedRoomIDs)

	if !params.Available(availableRoomIDBit) {
		room, err := repository.FindRoomByID(t.db, params.RoomID)
		if err != nil {
			return nil, err
		}
		return nil, model.RoomUnavailableError{RoomName: room.Name}
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

		if _, err := repository.CreateOrder(tx, &model.OrderParam{
			TableID:  params.ID,
			StaffID:  params.StaffID,
			ItemID:   model.APPETIZER_ID,
			Quantity: params.PersonCount,
		}); err != nil {
			log.Println(err)
			return err
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed table insert transaction")
	}

	res, err := repository.FindTableByID(t.db, params.ID)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (t *Table) End(ID int64) (*model.Table, error) {
	table, err := repository.FindTableByID(t.db, ID)
	if err != nil {
		return nil, err
	}

	if table.IsEnded {
		return nil, model.TableAlreadyEndedError{TableID: ID}
	}

	if _, err := repository.FindBillByTableID(t.db, ID); err != nil {
		if err.Error() == "sql: no rows in result set" {
			return nil, model.BillDoesNotExistError{TableID: ID}
		}
		return nil, err
	}

	if err := dbutil.TXHandler(t.db, func(tx *sqlx.Tx) error {
		_, err := repository.EndTable(tx, ID)
		if err != nil {
			return err
		}

		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed table update transaction")
	}

	res, err := repository.FindTableByID(t.db, ID)
	if err != nil {
		return nil, err
	}

	return res, nil
}
