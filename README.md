# README - CRUD Hortifruti

## Visao geral

Projeto full-stack para gerenciamento de um sistema de hortifruti.

- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: React + Vite
- Autenticacao: JWT + cookies
- Documentacao da API: Swagger
- Uploads: imagens de produtos e lojas

## Estrutura

```text
.
|-- codigo/      # Backend NestJS
|-- frontEnd/    # Frontend React
`-- README.md
```

## Backend

### 1. Instalar dependencias

```bash
cd codigo
npm install
```

### 2. Configurar ambiente

Copie `.envExample` para `.env` e ajuste os valores. Exemplo de configuracao para o Postgres do `docker-compose.yml`:

```env
JWT_SECRET=password123
JWT_EXPIRES_IN=20m

DB_URL=jdbc:postgresql://localhost:5435/postgresdb
DB_USER=postgres
DB_PASSWORD=postgres

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgresdb

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

Tambem e possivel usar `DB_HOST`, `DB_PORT` e `DB_NAME` em vez de `DB_URL`.

### 3. Subir o banco com Docker

```bash
docker compose up -d
```

Servicos expostos:

- PostgreSQL: `localhost:5435`
- pgAdmin: `http://localhost:15434`

### 4. Rodar o backend

```bash
npm run start:dev
```

Swagger:

- `http://localhost:3000/api`

Uploads:

- `http://localhost:3000/uploads/<arquivo>`

### Persistencia

O backend usa `TypeOrmModule.forRootAsync` com `type: 'postgres'`.

As tabelas sao criadas automaticamente a partir das entidades carregadas pelo TypeORM com:

```ts
autoLoadEntities: true,
synchronize: true,
```

## Testes do backend

```bash
npm test
npm run test:e2e
```

Os testes validam:

- inicializacao do Nest
- conexao com o PostgreSQL configurado no `.env`
- criacao automatica das tabelas com base nas entidades mapeadas

## Frontend

```bash
cd frontEnd
npm install
npm run dev
```

Se necessario, ajuste `VITE_API_BASE_URL` para o backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Frontend local:

- `http://localhost:5173`

## Tecnologias

- Backend: NestJS, TypeORM, PostgreSQL, Swagger, Multer
- Frontend: React, Vite, React Router, Axios
- Infra local: Docker, PostgreSQL, pgAdmin
