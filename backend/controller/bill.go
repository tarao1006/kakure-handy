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

// Bill is a struct to manipulate database.
type Bill struct {
	db *sqlx.DB
}

// NewBill create new Bill.
func NewBill(db *sqlx.DB) *Bill {
	return &Bill{db: db}
}

// Show return a Bill
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

// Create create new record.
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
	res, err := billService.Create(tableID, amount)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, res, nil
}

func (b *Bill) Delete(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	_, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	billID, err := httputil.ExtractID(mux.Vars(r), "bill_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	billService := service.NewBill(b.db)
	if err := billService.Delete(billID); err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, nil, nil
}
