package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

// FindBillByID returns Bill
func FindBillByID(db *sqlx.DB, ID int64) (*model.Bill, error) {
	bill := model.Bill{}
	if err := db.Get(&bill, `
		SELECT id, table_id, amount, is_valid, created_at FROM bill WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}
	return &bill, nil
}

// FindBillsByTableID returns Bill
func FindBillsByTableID(db *sqlx.DB, tableID int64) ([]model.Bill, error) {
	bills := make([]model.Bill, 0)
	if err := db.Select(&bills, `
		SELECT id, table_id, amount, is_valid, created_at FROM bill WHERE table_id = ? AND is_valid = true ORDER BY created_at
	`, tableID); err != nil {
		return nil, err
	}
	return bills, nil
}

// FindBillByTableID returns Bill
func FindBillByTableID(db *sqlx.DB, tableID int64) (*model.Bill, error) {
	bill := make([]model.Bill, 0)
	if err := db.Select(&bill, `
		SELECT id, table_id, amount, is_valid, created_at FROM bill WHERE table_id = ? AND is_valid ORDER BY created_at DESC
	`, tableID); err != nil {
		return nil, err
	}

	if len(bill) == 0 {
		return nil, nil
	}

	return &bill[0], nil
}

// CreateBill creates new bill record.
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

// RevokeBill update bill record.
func RevokeBill(db *sqlx.Tx, id int64) (result sql.Result, err error) {
	stmt, err := db.Prepare(`UPDATE bill SET is_valid = false WHERE id = ?`)
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

// GetAmount return amount found by table_id
func GetAmount(db *sqlx.DB, tableID int64) (int64, error) {
	var amount int64
	if err := db.Get(&amount, `
		SELECT amount FROM table_order_amount WHERE table_id = ?
	`, tableID); err != nil {
		return 0, err
	}
	return amount, nil
}
