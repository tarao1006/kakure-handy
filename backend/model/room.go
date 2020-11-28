package model

type Room struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	Capacity int64  `db:"capacity" json:"capacity"`
}
