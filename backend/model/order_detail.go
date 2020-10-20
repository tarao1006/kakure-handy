package model

// OrderDetail is a struct of order detail.
type OrderDetail struct {
	ID       int64  `db:"id" json:"id"`
	OrderID  int64  `db:"order_id" json:"order_id"`
	ItemName string `db:"item_name" json:"item_name"`
	Price    int64  `db:"price" json:"price"`
	Quantity int64  `db:"quantity" json:"quantity"`
	Status   string `db:"status" json:"status"`
}

// OrderDetailParam stores API request body.
type OrderDetailParam struct {
	ID       int64  `json:"id"`
	OrderID  int64  `json:"order_id"`
	ItemID   int64  `json:"item_id"`
	ItemName string `json:"item_name"`
	Quantity int64  `json:"quantity"`
	StatusID int64  `json:"status_id"`
	Status   string `json:"status"`
}
