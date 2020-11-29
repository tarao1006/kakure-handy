package model

var ROOM_AVAILABLE_BIT_MASK int64 = 1023
var roomIDs = []int64{1, 2, 3, 4, 5, 7, 8, 16, 32, 64, 128, 192, 256, 384, 448, 512}

type Room struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	Capacity int64  `db:"capacity" json:"capacity"`
}

func AvailableRoomIDs(occupiedTableIDs []int64) []int64 {
	var filled int64 = 0
	for _, ID := range occupiedTableIDs {
		filled |= ID
	}

	available := ROOM_AVAILABLE_BIT_MASK ^ filled
	res := make([]int64, 0)
	for _, ID := range roomIDs {
		if available&ID == ID {
			res = append(res, ID)
		}
	}
	return res
}
