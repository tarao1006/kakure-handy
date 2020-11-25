package model

type Item struct {
	ID            int64  `db:"id" json:"id"`
	CategoryID    int64  `db:"category_id" json:"category_id"`
	SubcategoryID int64  `db:"subcategory_id" json:"subcategory_id"`
	Name          string `db:"name" json:"name"`
	Price         int64  `db:"price" json:"price"`
}
