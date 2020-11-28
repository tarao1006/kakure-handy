package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func FindRoomByID(db *sqlx.DB, ID int64) (*model.Room, error) {
	room := model.Room{}
	if err := db.Get(&room, `
		SELECT id, name, capacity FROM room WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}
	return &room, nil
}
