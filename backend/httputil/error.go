package httputil

import (
	"fmt"
)

type HTTPError struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func (he *HTTPError) Error() string {
	return fmt.Sprintf("message=%w", he.Message)
}
