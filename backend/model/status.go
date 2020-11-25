package model

type Status struct {
	ID     int64  `db:"id"`
	Status string `db:"status"`
}
