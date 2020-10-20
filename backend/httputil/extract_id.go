package httputil

import (
	"errors"
	"strconv"
)

// ExtractID returns ID type of int64 from url path parameter
func ExtractID(vars map[string]string, key string) (int64, error) {
	id, ok := vars[key]

	if !ok {
		return 0, errors.New("key value is missing")
	}

	return strconv.ParseInt(id, 10, 64)
}
