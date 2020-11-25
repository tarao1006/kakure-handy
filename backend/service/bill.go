package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

type Bill struct {
	db *sqlx.DB
}

func NewBill(db *sqlx.DB) *Bill {
	return &Bill{db: db}
}

func (b *Bill) Create(tableID int64, amount int64) (*model.Bill, error) {
	bill, err := repository.FindBillByTableID(b.db, tableID)
	if err != nil && err.Error() != "sql: no rows in result set" {
		return nil, err
	}
	if bill != nil {
		return nil, model.BillAlreadyExistError{TableID: tableID}
	}

	var createdID int64
	if err := dbutil.TXHandler(b.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateBill(tx, tableID, amount)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		createdID = id
		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	res, err := repository.FindBillByID(b.db, createdID)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (b *Bill) Delete(tableID int64) error {
	bill, err := repository.FindBillByTableID(b.db, tableID)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			return model.BillDoesNotExistError{TableID: tableID}
		}
		return err
	}

	table, err := repository.FindTableByID(b.db, tableID)
	if err != nil {
		return err
	}
	if table.IsEnded {
		return model.TableAlreadyEndedError{TableID: tableID}
	}

	if err := dbutil.TXHandler(b.db, func(tx *sqlx.Tx) error {
		if _, err := repository.DeleteBill(tx, bill.ID); err != nil {
			return err
		}
		return nil
	}); err != nil {
		return err
	}

	return nil
}
