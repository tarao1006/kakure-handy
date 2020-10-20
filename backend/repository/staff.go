package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func GetStaff(db *sqlx.DB, uid string) (*model.User, error) {
	user := model.User{}
	if err := db.Get(&user, `
SELECT id, firebase_uid, display_name, email FROM staff WHERE firebase_uid = ? LIMIT 1
	`, uid); err != nil {
		return nil, err
	}
	return &user, nil
}

func SyncStaff(db *sqlx.DB, fu *model.FirebaseUser) (sql.Result, error) {
	return db.Exec(`
INSERT INTO staff (firebase_uid, display_name, email)
VALUES (?, ?, ?)
ON DUPLICATE KEY
UPDATE display_name = ?, email = ?
	`, fu.FirebaseUID, fu.DisplayName, fu.Email, fu.DisplayName, fu.Email)
}
