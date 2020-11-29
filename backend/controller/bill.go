package controller

import (
	"errors"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
	"github.com/tarao1006/kakure-handy/service"
)

type Bill struct {
	db *sqlx.DB
}

func NewBill(db *sqlx.DB) *Bill {
	return &Bill{db: db}
}

func (b *Bill) Show(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	bill, err := repository.FindBillByTableID(b.db, tableID)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, bill, nil
}

func (b *Bill) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	amount, err := repository.GetAmount(b.db, tableID)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	billService := service.NewBill(b.db)
	res, createErr := billService.Create(tableID, amount)
	if e, ok := createErr.(model.BillAlreadyExistError); ok {
		return http.StatusBadRequest, nil, e
	} else if createErr != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, res, nil
}

func (b *Bill) Delete(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	billService := service.NewBill(b.db)
	deleteErr := billService.Delete(tableID)
	if e, ok := deleteErr.(model.TableAlreadyEndedError); ok {
		return http.StatusBadRequest, nil, e
	} else if e, ok := deleteErr.(model.BillDoesNotExistError); ok {
		return http.StatusBadRequest, nil, e
	} else if deleteErr != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, nil, nil
}
