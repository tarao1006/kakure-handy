package model

const APPETIZER_ID int64 = 27

type Item struct {
	ID       int64    `json:"id"`
	Name     string   `json:"name"`
	Price    int64    `json:"price"`
	Category Category `json:"category"`
}

type ItemDTO struct {
	ID               int64  `db:"id"`
	Name             string `db:"name"`
	Price            int64  `db:"price"`
	CategoryID       int64  `db:"category_id"`
	CategoryName     string `db:"category_name"`
	CategoryTypeID   int64  `db:"category_type_id"`
	CategoryTypeName string `db:"category_type_name"`
}

func ConvertToItem(item ItemDTO) Item {
	return Item{
		ID:    item.ID,
		Name:  item.Name,
		Price: item.Price,
		Category: Category{
			ID:               item.CategoryID,
			Name:             item.CategoryName,
			CategoryTypeID:   item.CategoryTypeID,
			CategoryTypeName: item.CategoryTypeName,
		},
	}
}
