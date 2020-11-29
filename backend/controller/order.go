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

type Order struct {
	db *sqlx.DB
}

func NewOrder(db *sqlx.DB) *Order {
	return &Order{db: db}
}

func (o *Order) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tableID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	rawParams := make([]model.OrderParam, 0)
	if err := json.NewDecoder(r.Body).Decode(&rawParams); err != nil {
		return http.StatusBadRequest, nil, err
	}

	user, err := httputil.GetUserFromContext(r.Context())
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	params := make([]model.OrderParam, 0)
	for _, param := range rawParams {
		params = append(params, model.OrderParam{
			ItemID:   param.ItemID,
			Quantity: param.Quantity,
			StaffID:  user.ID,
			TableID:  tableID,
		})
	}
	orderService := service.NewOrder(o.db)
	order, err := orderService.Create(params)
	if e, ok := err.(model.TableIsEndedError); ok {
		return http.StatusBadRequest, nil, e
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, order, nil
}

func (o *Order) Update(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)

	tableID, err := httputil.ExtractID(vars, "table_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	// TODO: check if table is ended

	orderID, err := httputil.ExtractID(vars, "order_id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	param := &model.OrderParam{}
	if err := json.NewDecoder(r.Body).Decode(&param); err != nil {
		return http.StatusBadRequest, nil, err
	}
	param.ID = orderID
	param.TableID = tableID

	orderService := service.NewOrder(o.db)
	order, err := orderService.Update(param)
	if err != nil {
		if err.Error() == "invalid operation" {
			return http.StatusBadRequest, nil, err
		}
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, order, nil
}

func (o *Order) Next(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	ID, err := httputil.ExtractID(mux.Vars(r), "id")
	if err != nil {
		return http.StatusBadRequest, nil, errors.New("required parameter is missing")
	}

	orderService := service.NewOrder(o.db)
	order, progressErr := orderService.Next(ID)
	if e, ok := progressErr.(model.IsNotCourseError); ok {
		return http.StatusBadRequest, nil, e
	} else if progressErr != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, order, nil
}
