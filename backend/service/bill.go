package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// Bill is a struct to manipulate database.
type Bill struct {
	db *sqlx.DB
}

// NewBill create new Bill.
func NewBill(db *sqlx.DB) *Bill {
	return &Bill{db: db}
}

// Create は新しい会計を作成する。
// 上書きを許容するため、過去の会計を無効にする。
func (b *Bill) Create(tableID int64, amount int64) (*model.Bill, error) {
	var createdID int64
	bills, err := repository.FindBillsByTableID(b.db, tableID)
	if err != nil {
		return nil, err
	}

	if err := dbutil.TXHandler(b.db, func(tx *sqlx.Tx) error {
		for _, bill := range bills {
			_, err := repository.RevokeBill(tx, bill.ID)
			if err != nil {
				return err
			}
		}

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
