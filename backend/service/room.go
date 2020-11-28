package service

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/repository"
)

type Room struct {
	db *sqlx.DB
}

var BIT_MASK int64 = 1023
var IDs = []int64{1, 2, 3, 4, 5, 7, 8, 16, 32, 64, 128, 192, 256, 384, 448, 512}

func NewRoom(db *sqlx.DB) *Room {
	return &Room{db: db}
}

func (r *Room) AvailableRoom() ([]int64, error) {
	tables, err := repository.AllTable(r.db)
	if err != nil {
		return nil, err
	}

	var filled int64 = 0
	for _, table := range tables {
		filled |= table.Room.ID
	}

	available := BIT_MASK ^ filled
	res := make([]int64, 0)
	for _, ID := range IDs {
		if available&ID == ID {
			res = append(res, ID)
		}
	}
	log.Println(available)
	log.Println(res)

	return res, nil
}
