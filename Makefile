COMPOSE = docker compose

up:
	$(COMPOSE) up

upd:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

build:
	$(COMPOSE) build

rebuild:
	$(COMPOSE) build --no-cache

ps:
	$(COMPOSE) ps -a

#-----
# LOGS
#-----

logs:
	$(COMPOSE) logs -f

logs-backend:
	$(COMPOSE) logs -f backend

logs-frontend:
	$(COMPOSE) logs -f frontend

logs-nginx:
	$(COMPOSE) logs -f nginx

logs-db:
	$(COMPOSE) logs -f db

#------
# RAILS
#------

rails:
	$(COMPOSE) exec backend rails $(cmd)

bash:
	$(COMPOSE) exec backend bash

console:
	$(COMPOSE) exec backend rails console

routes:
	$(COMPOSE) exec backend rails routes

#---------------
# Banco de dados
#---------------

db-create:
	$(COMPOSE) exec backend rails db:create

db-drop:
	$(COMPOSE) exec backend rails db:drop

db-migrate:
	$(COMPOSE) exec backend rails db:migrate

db-reset:
	$(COMPOSE) exec backend rails db:reset

db-seed:
	$(COMPOSE) exec backend rails db:seed

#-------
# Testes
#--------

test:
	$(COMPOSE) exec backend bundle exec rspec

test-models:
	$(COMPOSE) exec backend bundle exec rspec spec/models

test-requests:
	$(COMPOSE) exec backend bundle exec rspec spec/requests

#--------
# LIMPEZA
#--------

clean:
	$(COMPOSE) down --remove-orphans

clean-volumes:
	$(COMPOSE) down -v --remove-orphans
