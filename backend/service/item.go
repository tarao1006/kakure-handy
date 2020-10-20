package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/dbutil"
	"github.com/tarao1006/kakure-handy/model"
	"github.com/tarao1006/kakure-handy/repository"
)

// Item is a struct to manipulate database.
type Item struct {
	db *sqlx.DB
}

// NewItem create new Bill.
func NewItem(db *sqlx.DB) *Item {
	return &Item{db: db}
}

// Create create new item.
func (i *Item) Create(item *model.Item) (*model.Item, error) {
	if err := dbutil.TXHandler(i.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateItem(tx, item)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		item.ID = id
		return err
	}); err != nil {
		return nil, errors.Wrap(err, "failed order insert transaction")
	}

	res, err := repository.FindItemByID(i.db, item.ID)
	if err != nil {
		return nil, err
	}

	return res, nil
}
