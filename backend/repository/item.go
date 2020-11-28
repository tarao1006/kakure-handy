package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

func AllItems(db *sqlx.DB) ([]model.Item, error) {
	items := make([]model.ItemDTO, 0)
	if err := db.Select(&items, `
		SELECT id, name, price, category_id, category_name, category_type_id, category_type_name FROM item_model ORDER BY id
	`); err != nil {
		return nil, err
	}
	res := make([]model.Item, 0)
	for _, item := range items {
		res = append(res, model.ConvertToItem(item))
	}
	return res, nil
}

func FindItemByID(db *sqlx.DB, ID int64) (*model.Item, error) {
	item := model.ItemDTO{}
	if err := db.Get(&item, `
		SELECT id, name, price, category_id, category_name, category_type_id, category_type_name FROM item_model WHERE id = ?
	`, ID); err != nil {
		return nil, err
	}
	res := model.ConvertToItem(item)
	return &res, nil
}

func CreateItem(db *sqlx.Tx, item *model.Item) (result sql.Result, err error) {
	stmt, err := db.Prepare(`INSERT INTO menu_item (name, price) VALUES (?, ?)`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(item.Name, item.Price)
}
