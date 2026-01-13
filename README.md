# BelfSports
### Sistema de Gestão de Eventos Esportivos

## Visão Geral
Aplicação **FullStack** desenvolvida como parte de um processo seletivo, com o objetivo de demonstrar integração fim‑a‑fim entre **Frontend (Next.js App Router)** e **Backend (Node.js + Fastify + Prisma)**, contemplando autenticação, RBAC, upload e moderação de fotos, painel administrativo e galeria pública.

O sistema permite gerenciar **Eventos**, **Spots**, **Uploads de Fotos**, **Moderação** e **Visualização Pública**, conforme requisitos do desafio técnico.

---

## Stack Utilizada

### Frontend
- Next.js (App Router)
- TypeScript
- shadcn/ui
- Tailwind CSS
- Context API para autenticação

### Backend
- Node.js
- Fastify
- TypeScript
- Prisma ORM
- SQLite (banco local)
- JWT para autenticação
- Multer para upload de arquivos

---

## Funcionalidades Implementadas

### Autenticação e RBAC
- Login com email e senha
- Autorização baseada em perfis (**admin**, **organizer**, **photographer**, **viewer**)
- Proteção de rotas no backend e frontend

### Eventos e Spots
- CRUD completo de Eventos
- CRUD de Spots vinculados a um Evento
- Restrições por perfil (admin/organizer)

### Upload de Fotos
- Upload real via `multipart/form-data`
- Formatos aceitos: JPEG / PNG
- Upload restrito ao perfil **photographer**
- Associação da foto a um Spot
- Armazenamento local em pasta de uploads

### Moderação
- Fila de fotos com status `pending`
- Aprovação ou rejeição por **admin** ou **organizer**
- Atualização de status (`approved` / `rejected`)

### Galeria Pública
- Listagem de fotos aprovadas
- Filtro por Evento e Spot
- Acesso sem autenticação

---

## Estrutura do Projeto

```
root/
 ├─ backend/
 │   ├─ prisma/
 │   │   ├─ schema.prisma
 │   │   └─ seed.ts
 │   ├─ src/
 │   │   ├─ controllers/
 │   │   ├─ routes/
 │   │   ├─ middlewares/
 │   │   └─ server.ts
 │   ├─ dev.db
 │   └─ package.json
 │
 └─ frontend/
     ├─ app/
     ├─ components/
     ├─ contexts/
     ├─ lib/
     └─ package.json
```

---

## Setup do Projeto

### Pré‑requisitos
- Node.js >= 18
- npm ou yarn

---

## Backend

### Instalação
```bash
cd backend
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
```

### Migrations e Seeds
```bash
npx prisma migrate dev
npx prisma db seed
```

### Rodar o Backend
```bash
npm run dev
```

API disponível em:
```
http://localhost:3333
```

---

## Frontend

### Instalação
```bash
cd frontend
npm install
```

### Variáveis de Ambiente
`.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Rodar o Frontend
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

## Endpoints Principais

### Auth
- `POST /auth/login`

### Eventos
- `GET /events`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`

### Spots
- `GET /events/:id/spots`
- `POST /spots`

### Fotos
- `POST /photos/upload`
- `GET /photos/pending`
- `PATCH /photos/:id/approve`
- `PATCH /photos/:id/reject`

### Galeria
- `GET /gallery`

---

## Testes

O projeto contém **testes automatizados** cobrindo:
- Autenticação
- RBAC (controle de acesso)
- Criação e moderação de fotos

Executar:
```bash
npm run test
```

---

## Qualidade e Boas Práticas
- ESLint configurado
- Tipagem forte com TypeScript
- Separação de camadas (routes, controllers, services)
- Tratamento básico de erros e logs

---

## Aderência ao Desafio Técnico

✔ Frontend com Next.js App Router e shadcn/ui
✔ Backend Node.js com API real (sem mocks)
✔ Autenticação e RBAC
✔ Upload e moderação de fotos
✔ Galeria pública
✔ Seeds para avaliação
✔ README completo com setup e instruções

---

## API

### URL Base
```
http://localhost:3333
```

## Observações Finais
Este projeto foi desenvolvido com foco em **clareza**, **organização**, **experiência do usuário** e **aderência total aos requisitos do desafio**. Estrutura preparada para fácil evolução e manutenção.

---

**Autor:** Mateus Belfort
