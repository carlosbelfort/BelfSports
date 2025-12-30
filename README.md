# BelfSports

## Visão Geral
Projeto fullstack composto por:
- **Backend**: Node.js + Fastify + Prisma + SQLite
- **Frontend**: Next.js + Tailwind CSS

---

## Setup do Projeto (Passo a Passo)

### Pré-requisitos
- Node.js >= 18
- NPM ou Yarn

Clone o repositório e extraia os projetos `backend` e `frontend`.

---

## Backend

### Instalação
```bash
cd backend/backend
npm install
```

### Variáveis de Ambiente
O arquivo `.env` já está configurado para ambiente local:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=supersecret
PORT=3333
```

### Executar Migrações
```bash
npx prisma migrate deploy
```

### Executar Seeds
```bash
npx prisma db seed
```

### Rodar Backend
```bash
npm run dev
```

Servidor disponível em:
```
http://localhost:3333
```

---

## Frontend

### Instalação
```bash
cd frontend/frontend
npm install
```

### Rodar Frontend
```bash
npm run dev
```

Aplicação disponível em:
```
http://localhost:3000
```

---

## Credenciais de Teste
(Definidas no seed do Prisma)

- **Admin**
  - Email: admin@belfsports.com
  - Senha: 123456

- **Organizador**
  - Email: org@belfsports.com
  - Senha: 123456

- **Fotógrafo**
  - Email: foto@belfsports.com
  - Senha: 123456

- **Usuário**
  - Email: user@belfsports.com
  - Senha: 123456

---

## API

### URL Base
```
http://localhost:3333
```

### Principais Rotas

#### Autenticação
- `POST /sessions` – Login

#### Usuários
- `POST /users` – Criar usuário
- `GET /users/me` – Usuário autenticado

#### Admin
- `GET /admin/users`
- `POST /admin/create`

#### Spots
- `GET /spots`
- `POST /spots`

#### Upload
- `POST /upload`

> Rotas protegidas utilizam JWT via header:
```http
Authorization: Bearer <token>
```

---

## Observações
- Banco SQLite local (`dev.db`)
- Prisma ORM
- Uploads com Cloudinary (credenciais mockadas no `.env`)

---

## Pronto para uso
Após rodar backend e frontend, o sistema estará totalmente funcional para testes e desenvolvimento.

