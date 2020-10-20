package repository

import (
	"github.com/jmoiron/sqlx"
)

// FindRoomByID returns roomr.
func FindRoomByID(db *sqlx.DB, id int64) (*Room, error) {
	room := Room{}
	if err := db.Get(&room, `
		SELECT id, name FROM room WHERE id = ?
	`, id); err != nil {
		return nil, err
	}
	return &room, nil
}

// Room is a struct of room.
type Room struct {
	ID   int64  `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}
