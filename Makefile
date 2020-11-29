DB_NAME:=kakure
DB_SERVICE:=db
MIGRATION_SERVICE:=migration
DOCKER_COMPOSE:=`which docker-compose`
FLYWAY_CONF:=-url=jdbc:mysql://db:3306/kakure -user=root -password=password
BACKEND_PORT:=8000

include .firebase.env
export $(shell sed 's/=.*//' .firebase.env)
export GOOGLE_APPLICATION_CREDENTIALS:=$(HOME)/.config/gcloud/kakure_handy.json
export GOOGLE_APPLICATION_CREDENTIALS_STR:=$(shell python3 json_parse.py --file $(GOOGLE_APPLICATION_CREDENTIALS))
export BACKEND_URL:=http://$(shell ipconfig getifaddr en0):$(BACKEND_PORT)

mysql/client:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword $(DB_NAME)

mysql/init:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword -e "create database \`$(DB_NAME)\`"

mysql/drop:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword -e "drop database \`$(DB_NAME)\`"

flyway/baseline:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) baseline

flyway/info:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) info

flyway/clean:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) clean

flyway/migrate:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) migrate

flyway/repair:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) repair

DOCKER_COMPOSE_FILE:=docker-compose.yml
DOCKER_COMPOSE_FILE_PROD:=docker-compose.prod.yml

docker-compose/up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up

docker-compose/build:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up --build

docker-compose/prod/up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE_PROD) up

docker-compose/prod/build:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE_PROD) build

docker-compose/prod/build/backend:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE_PROD) build backend-production

docker-compose/prod/build/frontdnd:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE_PROD) build frontdnd-production
