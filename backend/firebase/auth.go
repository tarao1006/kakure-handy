package firebase

import (
	"context"

	"google.golang.org/api/option"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

func InitAuthClient(keypath string) (*auth.Client, error) {
	opt := option.WithCredentialsFile(keypath)
	fb, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, err
	}
	return fb.Auth(context.Background())
}
