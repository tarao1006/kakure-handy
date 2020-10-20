package repository

import (
	"github.com/jmoiron/sqlx"
)

// FindStatusByID returns status.
func FindStatusByID(db *sqlx.DB, id int64) (*Status, error) {
	status := Status{}
	if err := db.Get(&status, `
		SELECT id, status FROM order_status WHERE id = ?
	`, id); err != nil {
		return nil, err
	}
	return &status, nil
}

// Status is a struct of room.
type Status struct {
	ID     int64  `db:"id" json:"id"`
	Status string `db:"status" json:"status"`
}
