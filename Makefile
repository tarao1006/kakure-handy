DB_NAME:=kakure
DB_SERVICE:=db
MIGRATION_SERVICE:=migration
DOCKER_COMPOSE:=`which docker-compose`
FLYWAY_CONF:=-url=jdbc:mysql://db:3306/kakure -user=root -password=password

export GOOGLE_APPLICATION_CREDENTIALS=$(HOME)/.config/gcloud/kakure_handy.json

mysql/client:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword $(DB_NAME)

mysql/init:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword -e "create database \`$(DB_NAME)\`"

mysql/drop:
	$(DOCKER_COMPOSE) exec $(DB_SERVICE) mysql -uroot -ppassword -e "drop database \`$(DB_NAME)\`"

flyway/baseline:
	$(DOCKER_COMPOSE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) baseline

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
