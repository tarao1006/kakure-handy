package middleware

import (
	"net/http"

	"github.com/rs/cors"
)

type CORS struct {
	cors *cors.Cors
}

func NewCORS() *CORS {
	return &CORS{
		cors: cors.New(cors.Options{
			AllowedOrigins: []string{"*"},
			AllowedHeaders: []string{"Authorization"},
			AllowedMethods: []string{
				http.MethodHead,
				http.MethodGet,
				http.MethodPost,
				http.MethodPut,
				http.MethodPatch,
				http.MethodDelete,
			},
		}),
	}
}

func (cors *CORS) Handler(next http.Handler) http.Handler {
	return cors.cors.Handler(next)
}
