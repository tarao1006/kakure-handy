package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// Bill はデータベースを操作する struct でアプリケーションサービスを担当する。
type Bill struct {
	db *sqlx.DB
}

// NewBill は Bill struct を作成する。
func NewBill(db *sqlx.DB) *Bill {
	return &Bill{db: db}
}

// Create は会計情報を作成する。
func (b *Bill) Create(tableID int64, amount int64) (*model.Bill, error) {
	bill, err := repository.FindBillByTableID(b.db, tableID)
	if err != nil && err.Error() != "sql: no rows in result set" {
		return nil, err
	}
	if bill != nil {
		return nil, errors.New("invalid table id")
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

// Delete は会計情報を削除する。
func (b *Bill) Delete(tableID int64) error {
	bill, err := repository.FindBillByTableID(b.db, tableID)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			return errors.New("invalid table id")
		}
		return err
	}

	table, err := repository.FindTableByID(b.db, tableID)
	if err != nil {
		return err
	}
	if table.IsEnded {
		return errors.New("invalid table id")
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
