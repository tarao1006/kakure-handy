package model

type User struct {
	ID          int64  `db:"id" json:"id"`
	FirebaseUID string `db:"firebase_uid" json:"firebase_uid"`
	DisplayName string `db:"display_name" json:"display_name"`
	Email       string `db:"email" json:"email"`
}
