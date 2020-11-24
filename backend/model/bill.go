package model

import "time"

type Bill struct {
	ID        int64     `db:"id" json:"id"`
	TableID   int64     `db:"table_id" json:"table_id"`
	Amount    int64     `db:"amount" json:"amount"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
