package httputil

import (
	"encoding/json"
	"log"
	"net/http"
	"reflect"
)

func RespondJson(w http.ResponseWriter, status int, payload interface{}) {
	response, err := marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, writeErr := w.Write([]byte(err.Error()))
		if writeErr != nil {
			log.Print(writeErr)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, writeErr := w.Write(response)
	if writeErr != nil {
		log.Print(writeErr)
	}
}

func marshal(payload interface{}) ([]byte, error) {
	if isNil(payload) {
		return []byte(`{}`), nil
	}
	return json.Marshal(payload)
}

func isNil(p interface{}) bool {
	if p == nil {
		return true
	}
	switch reflect.TypeOf(p).Kind() {
	case reflect.Ptr, reflect.Map, reflect.Slice, reflect.Array:
		return reflect.ValueOf(p).IsNil()
	}
	return false
}

func RespondErrorJson(w http.ResponseWriter, code int, err error) {
	log.Printf("code=%d, err=%s", code, err)
	if code >= 500 {
		RespondJson(w, code, HTTPError{Status: code, Message: http.StatusText(code)})
	} else if e, ok := err.(*HTTPError); ok {
		log.Print(code)
		RespondJson(w, code, HTTPError{Status: code, Message: e.Message})
	} else if err != nil {
		he := HTTPError{Status: code, Message: err.Error()}
		RespondJson(w, code, he)
	}
}
