package model

import "time"

// Bill is a struct of bill.
type Bill struct {
	ID        int64     `db:"id" json:"id"`
	TableID   int64     `db:"table_id" json:"table_id"`
	Amount    int64     `db:"amount" json:"amount"`
	IsValid   bool      `db:"is_valid" json:"is_valid"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
