package controller

import (
	"errors"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/repository"
	"github.com/tarao1006/kakure-handy/service"
)

type Room struct {
	db *sqlx.DB
}

func NewRoom(db *sqlx.DB) *Room {
	return &Room{db: db}
}

func (room *Room) Index(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	bill, err := repository.FindBillByTableID(room.db, tableID)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, bill, nil
}

func (room *Room) Available(_ http.ResponseWriter, _ *http.Request) (int, interface{}, error) {
	roomService := service.NewRoom(room.db)
	rooms, err := roomService.AvailableRoom()
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, rooms, nil
}
