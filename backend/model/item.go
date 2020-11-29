package model

const APPETIZER_ID int64 = 27

var COURSE_IDs = []int64{
	123,
	124,
	125,
	126,
	127,
	128,
	129,
}

var COURSE_ITEM_IDs = map[int64][]int64{
	123: {130, 131, 132, 133, 134, 135, 136},
	124: {137, 138, 139, 140, 146, 136},
	125: {137, 138, 139, 141, 146, 136},
	126: {137, 138, 139, 142, 146, 136},
	127: {137, 138, 139, 143, 146, 136},
	128: {137, 138, 139, 144, 146, 136},
	129: {137, 138, 139, 145, 146, 136},
}

func IsCourse(ID int64) bool {
	for _, course_id := range COURSE_IDs {
		if ID == course_id {
			return true
		}
	}
	return false
}

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
