package server

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"firebase.google.com/go/auth"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/justinas/alice"
	"github.com/tarao1006/kakure-handy/controller"
	"github.com/tarao1006/kakure-handy/db"
	"github.com/tarao1006/kakure-handy/firebase"
	"github.com/tarao1006/kakure-handy/middleware"
)

type Server struct {
	db         *sqlx.DB
	router     http.Handler
	authClient *auth.Client
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(datasource string, keypath string) error {
	authClient, err := firebase.InitAuthClient(keypath)
	if err != nil {
		return fmt.Errorf("failed init auth client. %s", err)
	}
	s.authClient = authClient

	cs := db.NewDB(datasource)
	con, err := cs.Open()
	if err != nil {
		return fmt.Errorf("failed db init. %s", err)
	}
	s.db = con
	s.router = s.Route()
	return nil
}

func (s *Server) Run(port int) {
	log.Printf("Listening on port %d", port)
	err := http.ListenAndServe(
		fmt.Sprintf(":%d", port),
		handlers.CombinedLoggingHandler(os.Stdout, s.router),
	)
	if err != nil {
		panic(err)
	}
}

func (s *Server) Route() http.Handler {
	tableController := controller.NewTable(s.db)
	orderController := controller.NewOrder(s.db)
	billController := controller.NewBill(s.db)
	itemController := controller.NewItem(s.db)
	roomController := controller.NewRoom(s.db)

	r := mux.NewRouter()

	r.Methods(http.MethodGet).Path("/table").Handler(AppHandler{tableController.Index})
	r.Methods(http.MethodPost).Path("/table").Handler(AppHandler{tableController.Create})
	r.Methods(http.MethodGet).Path("/table/{id:[0-9]+}").Handler(AppHandler{tableController.Show})
	r.Methods(http.MethodPut).Path("/table/{id:[0-9]+}/end").Handler(AppHandler{tableController.End})

	r.Methods(http.MethodPost).Path("/table/{id:[0-9]+}/order").Handler(AppHandler{orderController.Create})
	r.Methods(http.MethodPatch).Path("/table/{table_id:[0-9]+}/order/{order_id:[0-9]+}").Handler(AppHandler{orderController.Update})

	r.Methods(http.MethodPost).Path("/table/{id:[0-9]+}/bill").Handler(AppHandler{billController.Create})
	r.Methods(http.MethodGet).Path("/table/{id:[0-9]+}/bill").Handler(AppHandler{billController.Show})
	r.Methods(http.MethodDelete).Path("/table/{id:[0-9]+}/bill").Handler(AppHandler{billController.Delete})

	r.Methods(http.MethodGet).Path("/item").Handler(AppHandler{itemController.Index})

	r.Methods(http.MethodGet).Path("/room/available").Handler(AppHandler{roomController.Available})

	recoverMiddleware := middleware.NewRecover()
	authMiddleware := middleware.NewAuth(s.authClient, s.db)
	corsMiddleware := middleware.NewCORS()

	chain := alice.New(
		recoverMiddleware.Handler,
		corsMiddleware.Handler,
		authMiddleware.Handler,
	).Then(r)

	return chain
}
