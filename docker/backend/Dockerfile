FROM golang:latest AS build-reflex

RUN go get github.com/cespare/reflex

FROM golang:latest
COPY --from=build-reflex /go/bin/reflex /go/bin/reflex

ENV GOOS=linux \
  GOARCH=amd64 \
  CGO_ENABLED=0

WORKDIR /app

COPY go.mod .
RUN go mod download

COPY . .
