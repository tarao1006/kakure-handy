package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
	"github.com/tarao1006/kakure-handy/service"
)

type Table struct {
	db *sqlx.DB
}

func NewTable(db *sqlx.DB) *Table {
	return &Table{db: db}
}

func (t *Table) Index(_ http.ResponseWriter, _ *http.Request) (int, interface{}, error) {
	tables, err := repository.AllTable(t.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, tables, nil
}

func (t *Table) Show(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	ID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	table, err := repository.FindTableByID(t.db, ID)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, table, nil
}

func (t *Table) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	params := &model.TableParam{}
	if err := json.NewDecoder(r.Body).Decode(params); err != nil {
		return http.StatusBadRequest, nil, err
	}

	user, err := httputil.GetUserFromContext(r.Context())
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	params.StaffID = user.ID

	tableService := service.NewTable(t.db)
	table, err := tableService.Create(params)
	if e, ok := err.(model.RoomUnavailableError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, table, nil
}

func (t *Table) End(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	ID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	tableService := service.NewTable(t.db)
	res, err := tableService.End(ID)
	if e, ok := err.(model.TableAlreadyEndedError); ok {
		return http.StatusBadRequest, nil, e
	} else if e, ok := err.(model.BillDoesNotExistError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, res, nil
}
