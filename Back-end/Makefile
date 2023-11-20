DOCKER_COMPOSE_CMD=$(shell echo 'docker-compose')

backend_install:
	$(DOCKER_COMPOSE_CMD) run --rm server_web_back yarn install

prepare: \
	backend_install

up:
	$(DOCKER_COMPOSE_CMD) up -d
