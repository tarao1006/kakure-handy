package httputil

import (
	"context"

	"github.com/pkg/errors"
	"github.com/tarao1006/kakure-handy/model"
)

type contextKey string

const UserContextKey contextKey = "user"

func SetUserToContext(ctx context.Context, user *model.User) context.Context {
	return context.WithValue(ctx, UserContextKey, user)
}

func GetUserFromContext(ctx context.Context) (*model.User, error) {
	v := ctx.Value(UserContextKey)
	user, ok := v.(*model.User)
	if !ok {
		return nil, errors.New("user not found from context value")
	}
	return user, nil
}
