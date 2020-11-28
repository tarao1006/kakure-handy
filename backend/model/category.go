package model

type Category struct {
	ID               int64  `db:"id" json:"id"`
	Name             string `db:"name" json:"name"`
	CategoryTypeID   int64  `db:"category_type_id" json:"category_type_id"`
	CategoryTypeName string `db:"category_type_name" json:"category_type_name"`
}
