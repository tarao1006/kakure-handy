package server

import (
	"net/http"

	"github.com/tarao1006/kakure-handy/httputil"
)

// AppHandler has h to handle response.
type AppHandler struct {
	h func(http.ResponseWriter, *http.Request) (int, interface{}, error)
}

func (a AppHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	status, res, err := a.h(w, r)
	if err != nil {
		httputil.RespondErrorJson(w, status, err)
		return
	}
	httputil.RespondJson(w, status, res)
	return
}
