package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
	"github.com/tarao1006/kakure-handy/service"
)

type Item struct {
	db *sqlx.DB
}

func NewItem(db *sqlx.DB) *Item {
	return &Item{db: db}
}

func (i *Item) Index(_ http.ResponseWriter, _ *http.Request) (int, interface{}, error) {
	items, err := repository.AllItems(i.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, items, nil
}

func (i *Item) Create(_ http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	newItem := &model.Item{}

	if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
		return http.StatusBadRequest, nil, err
	}

	if newItem.Name == "" {
		return http.StatusUnprocessableEntity, nil, errors.New("required parameter is missing")
	}

	itemService := service.NewItem(i.db)
	res, err := itemService.Create(newItem)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, res, nil
}
