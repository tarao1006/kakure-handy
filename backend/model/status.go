package model

type Status struct {
	ID     int64  `db:"id" json:"id"`
	Status string `db:"status" json:"status"`
}
