# Brazil Cities

![Ruby](https://img.shields.io/badge/Ruby-2.7.0-CC342D?logo=ruby&logoColor=white)
![Rails](https://img.shields.io/badge/Rails-5.2.8-CC0000?logo=rubyonrails&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx&logoColor=white)

Aplicação full-stack para gestão de **estados** e **cidades** do Brasil, com CRUD completo, busca textual aproximada (tolerante a erros de digitação) e interface web com suporte a tradução pt-BR.

## Arquitetura

| Componente | Tecnologia | Porta |
|---|---|---|
| **Backend** | Ruby on Rails 5.2 + PostgreSQL 14 | 3000 |
| **Frontend** | React 19 + TypeScript + Vite + Bootstrap 5 | 5173 |
| **Proxy** | Nginx (Alpine) | 80 |

O Nginx expõe a aplicação em uma única porta (`http://localhost`): `/api/*` é encaminhado para o Rails e o restante para o React (Vite).

## Funcionalidades

- CRUD de **Estados** e **Cidades** via API REST e interface web
- Busca de cidades por nome ou pelo nome do estado, com matching aproximado usando o plugin `pg_trgm` (extensão de trigramas do PostgreSQL) em conjunto com o gem `pg_search`
- Frontend em pt-BR, com rotas dedicadas para listagem, criação, edição, exibição e busca
- Banco de dados populado com seeds (estados e cidades do Sul do Brasil)

## API

### v1

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v1/states` | Lista estados |
| GET | `/api/v1/states/:id` | Mostra um estado |
| POST | `/api/v1/states` | Cria estado (`name`, `population`) |
| PATCH | `/api/v1/states/:id` | Atualiza estado |
| DELETE | `/api/v1/states/:id` | Remove estado |
| GET | `/api/v1/cities` | Lista cidades |
| GET | `/api/v1/cities/:id` | Mostra uma cidade |
| POST | `/api/v1/cities` | Cria cidade (`name`, `population`, `state_id`) |
| PATCH | `/api/v1/cities/:id` | Atualiza cidade |
| DELETE | `/api/v1/cities/:id` | Remove cidade |

### v2

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/v2/search_cities?q=<termo>&type=<city\|state>` | Busca cidades por nome da cidade ou nome do estado (busca aproximada) |

Exemplo:

```bash
curl "http://localhost/api/v2/search_cities?q=Curitba&type=city"
curl "http://localhost/api/v2/search_cities?q=Paraná&type=state"
```

## Estrutura do projeto

```
.
├── backend/            # API Rails (API-only com controllers sob app/controllers/api)
│   ├── app/controllers/api/v1   # CRUD de states e cities
│   ├── app/controllers/api/v2   # Busca de cidades
│   ├── app/models               # State, City (City usa pg_search)
│   ├── app/services/cities      # Service object de busca (Cities::Search)
│   └── db/                      # Migrations, schema e seeds
├── frontend/           # SPA React (Vite + TypeScript + Bootstrap)
│   └── src/
│       ├── pages/               # Rotas de estados, cidades e busca
│       ├── components/          # Navbar e formulários
│       ├── services/api.ts      # Cliente HTTP da API
│       └── i18n.ts              # Traduções pt-BR
├── nginx/nginx.conf    # Proxy reverso (porta 80)
├── docker-compose.yml  # db, backend, frontend e nginx
└── Makefile            # Atalhos comuns de desenvolvimento
```

## Como rodar

Requisitos: Docker e Docker Compose.

```bash
# Sobe todos os serviços (db, backend, frontend, nginx)
make up

# (alternativa) sobe em background
make upd

# Prepara o banco de dados (cria, migra e popula)
make db-setup
```

Depois acesse:

- **Aplicação (via Nginx):** http://localhost
- **API:** http://localhost/api/v1/states
- **Frontend direto (Vite):** http://localhost:5173
- **Rails direto:** http://localhost:3000

Para parar:

```bash
make down
```

## Makefile (principais comandos)

| Comando | Descrição |
|---|---|
| `make up` / `make upd` | Sobe os containers (foreground / background) |
| `make down` | Derruba os containers |
| `make logs` | Logs de todos os serviços (`logs-backend`, `logs-frontend`, `logs-nginx`, `logs-db`) |
| `make console` | Console Rails |
| `make routes` | Roteamento da API |
| `make db-setup` | `db:create db:migrate db:seed` |
| `make db-setup-test` | Prepara o banco do ambiente de teste |
| `make rails cmd="..."` | Executa qualquer tarefa Rails dentro do container |

## Testes

O backend possui testes de modelo e de controller/integração (Minitest) em `backend/test/`. Para rodar:

```bash
make db-setup-test
sudo docker exec -it $(docker compose ps -q backend) RAILS_ENV=test bin/rails test
```

## Demonstração

<video src="./frontend/public/embarca_test.mp4" controls width="800"></video>
