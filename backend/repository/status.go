package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func FindStatusByID(db *sqlx.DB, ID int64) (*model.Status, error) {
	status := model.Status{}
	if err := db.Get(&status, `
		SELECT id, status FROM order_status WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}
	return &status, nil
}
