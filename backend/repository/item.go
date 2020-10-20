package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/tarao1006/kakure-handy/model"
)

// AllItems returns all records.
func AllItems(db *sqlx.DB) ([]model.Item, error) {
	items := make([]model.Item, 0)
	if err := db.Select(&items, `
		SELECT id, category_id, subcategory_id, name, price FROM menu_item ORDER BY id
	`); err != nil {
		return nil, err
	}
	return items, nil
}

// FindItemByID returns item.
func FindItemByID(db *sqlx.DB, id int64) (*model.Item, error) {
	item := model.Item{}
	if err := db.Get(&item, `
		SELECT id, category_id, subcategory_id, name, price FROM room WHERE id = ?
	`, id); err != nil {
		return nil, err
	}
	return &item, nil
}

// CreateItem create new item.
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
