package controller

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
	"github.com/tarao1006/kakure-handy/service"
)

// Table manipulates database.
type Table struct {
	db *sqlx.DB
}

// NewTable returns a Table struct.
func NewTable(db *sqlx.DB) *Table {
	return &Table{db: db}
}

// Index returns all tables information.
func (t *Table) Index(_ http.ResponseWriter, _ *http.Request) (int, interface{}, error) {
	tables, err := repository.AllTable(t.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, tables, nil
}

// Show returns a table information.
func (t *Table) Show(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	id, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	table, err := repository.FindTableByID(t.db, &model.TableParam{ID: id})
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, table, nil
}

// Create receives room_id from body and create new table.
func (t *Table) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	params := &model.TableParam{}
	if err := json.NewDecoder(r.Body).Decode(params); err != nil {
		return http.StatusBadRequest, nil, err
	}

	tableService := service.NewTable(t.db)
	table, err := tableService.Create(params)
	if e, ok := err.(model.RoomUnavailableError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, table, nil
}

// Update receives id and update dinner_table record.
func (t *Table) Update(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	id, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	tableService := service.NewTable(t.db)
	res, err := tableService.End(&model.TableParam{ID: id})
	if e, ok := err.(model.TableAlreadyEndedError); ok {
		return http.StatusBadRequest, nil, e
	} else if e, ok := err.(model.BillDoesNotExistError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, res, nil
}
