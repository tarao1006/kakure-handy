package controller

import (
	"errors"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/service"
)

// OrderDetail is a struct to manipulate database.
type OrderDetail struct {
	db *sqlx.DB
}

// NewOrderDetail create new OrderDetail.
func NewOrderDetail(db *sqlx.DB) *OrderDetail {
	return &OrderDetail{db: db}
}

// Update change order status.
func (a *OrderDetail) Update(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)

	_, err := httputil.ExtractID(vars, "table_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	// TODO: check if table is ended

	orderDetailID, err := httputil.ExtractID(vars, "order_detail_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	params := &model.OrderDetailParam{
		ID:       orderDetailID,
		Status:   "served",
		StatusID: 2,
	}

	orderDetailService := service.NewOrderDetail(a.db)
	orderDetail, err := orderDetailService.Update(params)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, orderDetail, nil
}

// Delete change order status.
func (a *OrderDetail) Delete(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)

	_, err := httputil.ExtractID(vars, "table_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	// TODO: check if table is ended

	orderDetailID, err := httputil.ExtractID(vars, "order_detail_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	params := &model.OrderDetailParam{
		ID:       orderDetailID,
		Status:   "canceled",
		StatusID: 3,
	}

	orderDetailService := service.NewOrderDetail(a.db)
	orderDetail, err := orderDetailService.Update(params)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, orderDetail, nil
}
