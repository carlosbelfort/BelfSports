# BelfSports  
### Sistema de Gestão de Eventos Esportivos

## Visão Geral

O **BelfSports** é uma aplicação **Full Stack** desenvolvida como parte de um **processo seletivo técnico**, com foco em demonstrar boas práticas de arquitetura, autenticação, controle de acesso (RBAC), testes automatizados e integração entre **Frontend (Next.js App Router)** e **Backend (Node.js + Fastify + Prisma)**.

O sistema permite o gerenciamento completo de **Eventos Esportivos**, **Spots de Fotografia**, **Upload e Moderação de Fotos**, além de uma **Galeria Pública** para visualização de conteúdos aprovados.

---

## Stack Utilizada

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Context API (Autenticação)

### Backend
- Node.js
- Fastify
- TypeScript
- Prisma ORM
- SQLite (banco local)
- JWT (autenticação)
- `@fastify/multipart` (upload de arquivos)

### Testes
- Vitest
- Fastify `app.inject` (testes de integração)

---

## Funcionalidades Implementadas

### Autenticação e RBAC
- Login com email e senha
- Criação de novo usuario com role padrão de "USER"
- Autenticação via JWT
- Controle de acesso por perfil (**ADMIN**, **ORGANIZER**, **PHOTOGRAPHER**, **USER**)
- Proteção de rotas no backend
- Restrição de funcionalidades por papel do usuário

### Eventos
- Criação de eventos (ORGANIZER)
- Listagem de eventos aprovados (ADMIN)
- Validação de acesso (401 / 403)

### Spots
- Criação de spots vinculados a um evento
- Listagem de spots pendentes
- Aprovação / rejeição de spots (ADMIN)
- Exclusão de spots

### Upload de Fotos
- Upload real via `multipart/form-data`
- Upload restrito a **PHOTOGRAPHER** ou **ADMIN**
- Associação de fotos a Spots
- Armazenamento local em diretório `/uploads`

### Moderação de Fotos
- Listagem de fotos pendentes
- Aprovação ou rejeição por **ADMIN** ou **ORGANIZER**
- Controle de status das fotos

### Galeria Pública
- Listagem de fotos aprovadas
- Acesso público (sem autenticação)
- Filtro por evento e spot

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
 │   │   ├─ tests/
 │   │   └─ server.ts
 │   ├─ dev.db
 │   ├─ vitest.config.ts
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

### Pré-requisitos
- Node.js >= 18
- npm

---

## Backend

### Instalação
```bash
cd backend
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecret"
```

### Banco de Dados (Prisma)

```bash
npx prisma migrate dev
npx prisma db seed
```

### Executar o Backend
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

### Executar o Frontend
```bash
npm run dev
```

Aplicação disponível em:
```
http://localhost:3000
```

---

## Credenciais de Teste

| Perfil | Email | Senha |
|------|------|------|
| Admin | admin@belfsports.com | 123456 |
| Organizer | org@belfsports.com | 123456 |
| Photographer | foto@belfsports.com | 123456 |
| User | user@belfsports.com | 123456 |

---

## Testes Automatizados

Os testes estão localizados em `backend/src/tests` e utilizam **Vitest** com `app.inject`.

Executar:
```bash
npm run test
```

---

## Aderência ao Desafio Técnico

✔ Backend Node.js com API real  
✔ Frontend Next.js App Router  
✔ Autenticação JWT  
✔ RBAC  
✔ Upload e moderação de fotos  
✔ Galeria pública  
✔ Seeds para avaliação  
✔ Testes automatizados  
✔ README completo e explicativo  

---

## Observações Finais

Este projeto foi desenvolvido com foco em clareza, organização, boas práticas e facilidade de avaliação técnica.

---

**Autor:** Mateus Belfort

