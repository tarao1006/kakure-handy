package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

type Room struct {
	db *sqlx.DB
}

func NewRoom(db *sqlx.DB) *Room {
	return &Room{db: db}
}

func (r *Room) AvailableRoom() ([]int64, error) {
	tables, err := repository.AllTable(r.db)
	if err != nil {
		return nil, err
	}
	occupiedRoomIDs := model.OccupiedRoomIDs(tables)
	return model.AvailableRoomIDs(occupiedRoomIDs), nil
}
