package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/httputil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/service"
)

// Order is a struct to manipulate database.
type Order struct {
	db *sqlx.DB
}

// NewOrder create new Order.
func NewOrder(db *sqlx.DB) *Order {
	return &Order{db: db}
}

// Create create new order.
func (a *Order) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	params := &model.OrderParam{}
	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		return http.StatusBadRequest, nil, err
	}

	user, err := httputil.GetUserFromContext(r.Context())
	if err != nil {
		return http.StatusBadRequest, nil, err
	}
	params.StaffID = user.ID
	params.TableID = tableID
	orderService := service.NewOrder(a.db)
	order, err := orderService.Create(params)
	if e, ok := err.(model.TableIsEndedError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, order, nil
}
