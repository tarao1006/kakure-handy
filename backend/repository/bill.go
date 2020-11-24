package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

// FindBillByID は Bill の ID で検索する。
func FindBillByID(db *sqlx.DB, ID int64) (*model.Bill, error) {
	bill := model.Bill{}
	if err := db.Get(&bill, `
		SELECT id, table_id, amount, created_at FROM bill WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}
	return &bill, nil
}

// FindBillByTableID は tableID で検索する。
func FindBillByTableID(db *sqlx.DB, tableID int64) (*model.Bill, error) {
	bill := model.Bill{}
	if err := db.Get(&bill, `
		SELECT id, table_id, amount, created_at FROM bill WHERE table_id = ?
	`, tableID); err != nil {
		return nil, err
	}

	return &bill, nil
}

// CreateBill は会計情報を作成する。
func CreateBill(db *sqlx.Tx, tableID int64, amount int64) (result sql.Result, err error) {
	stmt, err := db.Prepare(`INSERT INTO bill (table_id, amount) VALUES (?, ?)`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(tableID, amount)
}

// DeleteBill は会計情報を削除する。
func DeleteBill(db *sqlx.Tx, id int64) (result sql.Result, err error) {
	stmt, err := db.Prepare(`DELETE FROM bill WHERE id = ?`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(id)
}

// GetAmount は合計金額を返す。
func GetAmount(db *sqlx.DB, tableID int64) (int64, error) {
	var amount int64
	if err := db.Get(&amount, `
		SELECT amount FROM table_order_amount WHERE table_id = ?
	`, tableID); err != nil {
		return 0, err
	}
	return amount, nil
}
