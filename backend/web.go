package main

import (
	"log"

	"github.com/tarao1006/kakure-handy/server"
)

func main() {
	var (
		datasource = "root:password@tcp(db:3306)/kakure?parseTime=true&loc=Asia%2FTokyo"
		keypath    = "/tmp/serviceAccount.json"
		port       = 8000
	)

	s := server.NewServer()
	if err := s.Init(datasource, keypath); err != nil {
		log.Fatal(err)
	}
	s.Run(port)
}
