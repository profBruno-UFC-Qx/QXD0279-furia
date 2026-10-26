# 📚 Documentação Técnica da API — Backend Avaliaê

Documentação destinada à equipa de **Frontend** e a ferramentas de **IA assistentes**, servindo como base de contexto. Reúne rotas, contratos de dados (payloads/respostas), modelo de base de dados, autenticação, tipos TypeScript e observações críticas para a integração.

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Rede, CORS e Ambiente](#2-rede-cors-e-ambiente)
3. [Modelo de Dados](#3-modelo-de-dados)
4. [Autenticação e Autorização (JWT)](#4-autenticação-e-autorização-jwt)
5. [Referência de Endpoints](#5-referência-de-endpoints)
6. [Padrão de Erros](#6-padrão-de-erros)
7. [Tipos TypeScript para o Frontend](#7-tipos-typescript-para-o-frontend)
8. [Guia de Integração no Frontend](#8-guia-de-integração-no-frontend)
9. [Pontos de Atenção do Backend](#9-pontos-de-atenção-do-backend)
10. [Configuração do MinIO](#10-configuração-do-minio-storage-local)

---

## 1. Visão Geral da Arquitetura

| Item | Tecnologia / Valor |
|---|---|
| Ambiente de execução | Node.js + TypeScript, ESM nativo (`"type": "module"`) |
| Framework web | Express 5 (`^5.2.1`) |
| ORM / Base de dados | Prisma + PostgreSQL 15 |
| Validação de schemas | Zod (`^4.6.7`) |
| Autenticação | JWT (`jsonwebtoken`) + `bcrypt` (10 rounds) |
| Armazenamento de arquivos | MinIO (S3 compatible) |
| Porta padrão | `9876` |
| URL base | `http://localhost:9876` |

> **Por que Prisma?** Segurança de tipagem ponta a ponta com TypeScript, sintaxe declarativa intuitiva e geração de um client customizado que facilita a manutenção estrutural da base de dados e elimina erros de query em tempo de compilação.

---

## 2. Rede, CORS e Ambiente

### 2.1. CORS (`src/index.ts`)

| Configuração | Valor |
|---|---|
| Origem permitida (`origin`) | `http://localhost:3000` |
| Métodos | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` |
| Headers | `Content-Type`, `Authorization` |

> [!WARNING]
> **Alerta para o Frontend**
> Se a aplicação correr noutra porta (ex.: `http://localhost:5173` no Vite ou `http://localhost:5174`), ocorrerá **erro de CORS**.
>
> **Soluções recomendadas:**
> 1. Configurar um proxy no `vite.config.ts` (redirecionando `/api` para `http://localhost:9876`);
> 2. Correr o frontend na porta `3000`;
> 3. Pedir ao backend que adicione a sua porta ao array de origens do CORS.

### 2.2. Variáveis de Ambiente (`.env`)

```env
# Base de Dados
DB_HOST="localhost"
DB_NAME="avaliae_db"
DB_USER="narciso"
DB_PASSWORD="123"
DATABASE_URL="postgres://narciso:123@localhost:5432/avaliae_db"

# Autenticação
JWT_SECRET=<GERE_UM_SEGREDO_FORTE_AQUI>

# MinIO (Storage de Documentos)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=SUA_ACCESS_KEY_AQUI
MINIO_SECRET_KEY=SUA_SECRET_KEY_AQUI
MINIO_BUCKET_NAME=avaliae-docs
```

---

## 3. Modelo de Dados

O backend usa um padrão de **herança/composição via relação 1:1**:

- Existe uma tabela base de utilizadores: `generic_user`.
- Dados de perfis especializados ficam em tabelas dedicadas, ligadas por chave estrangeira (atualmente apenas `student`).

### 3.1. Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    GENERIC_USER ||--o| STUDENT : "user_id (1:1)"

    GENERIC_USER {
        int user_id PK "SERIAL"
        string name "VARCHAR(100)"
        string email "VARCHAR(50), Unique logic"
        string password "VARCHAR(100) - Bcrypt hash"
        enum role "'student' | 'teacher' | 'admin'"
    }

    STUDENT {
        int student_id PK "SERIAL"
        string course "VARCHAR(100)"
        int user_id FK "REFERENCES generic_user(user_id)"
    }
```

### 3.2. Roles Suportadas

```typescript
export type UserTypeRoles = "student" | "teacher" | "admin";
```

| Role | Estado |
|---|---|
| `student` | ✅ Totalmente mapeado na base de dados e nas rotas |
| `teacher` | ⚠️ Previsto no enum e tabelas; rota de registo ainda não finalizada |
| `admin` | ⏳ Previsto no enum; sem lógica específica implementada |

---

## 4. Autenticação e Autorização (JWT)

### 4.1. Geração do Token (`createToken.ts`)

- **Expiração:** 60 minutos (`expiresIn: "60m"`)
- **Algoritmo:** HMAC SHA256 (padrão) com `JWT_SECRET`

**Payload do token:**

```typescript
interface TokenPayload {
  user_id: number;
  role: "student" | "teacher" | "admin";
  iat: number;
  exp: number;
}
```

### 4.2. Envio do Token pelo Frontend

Em rotas protegidas (que usam o `AuthMiddleware`), envie o cabeçalho:

```http
Authorization: Bearer <TOKEN_JWT_AQUI>
```

### 4.3. Comportamento do `AuthMiddleware`

1. Verifica a presença do cabeçalho `Authorization`.
2. Rejeita formatos diferentes de `Bearer <token>`.
3. Valida o token e descodifica o utilizador.
4. Se inválido ou expirado, retorna `401 Unauthorized`.

---

## 5. Referência de Endpoints

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/auth/register` | Pública | Registo de aluno |
| `POST` | `/auth/login` | Pública | Login de qualquer utilizador |
| `GET` | `/` | — | Rota de teste |

### 5.1. Registo de Aluno — `POST /auth/register`

Regista um novo utilizador com perfil de estudante (`role: "student"`).

- **Autenticação:** nenhuma (rota pública)
- **Content-Type:** `application/json`

#### Request Body

```json
{
  "name": "Maria Silva",
  "email": "maria@ufc.br",
  "password": "senhaForte123",
  "role": "student",
  "course": "Engenharia de Software"
}
```

#### Validação (Zod)

| Campo | Tipo | Validação | Descrição |
|---|---|---|---|
| `name` | string | Obrigatório | Nome completo |
| `email` | string | E-mail válido | E-mail (único) |
| `password` | string | Mínimo 8 caracteres | Senha de acesso |
| `role` | string | Deve ser `"student"` | Perfil de acesso |
| `course` | string | Obrigatório se `student` | Curso do aluno |

#### Resposta de sucesso — `201 Created`

```json
{
  "userResponse": {
    "name": "Maria Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Respostas de erro

**`400 Bad Request`** — validação de schema falhou:

```json
{
  "message": "Bad request",
  "details": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 8,
        "type": "string",
        "inclusive": true,
        "message": "String must contain at least 8 character(s)",
        "path": ["password"]
      }
    ]
  }
}
```

**`409 Conflict`** — e-mail já utilizado:

```json
{
  "message": "Usuario ja cadastrado."
}
```

**`500 Internal Server Error`** — erro inesperado, ou tentativa de registo com `role: "teacher"` (ainda não implementado).

---

### 5.2. Login — `POST /auth/login`

Autentica qualquer utilizador já registado (`student`, `teacher`, `admin`).

- **Autenticação:** nenhuma (rota pública)
- **Content-Type:** `application/json`

#### Request Body

```json
{
  "email": "maria@ufc.br",
  "password": "senhaForte123"
}
```

#### Validação (Zod)

| Campo | Tipo | Validação |
|---|---|---|
| `email` | string | E-mail válido |
| `password` | string | Mínimo 8 caracteres |

#### Resposta de sucesso — `200 OK`

```json
{
  "userResponse": {
    "name": "Maria Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Respostas de erro

**`400 Bad Request`** — dados fora do padrão:

```json
{
  "message": "E-mail ou senha mal formatados"
}
```

**`401 Unauthorized`** — e-mail não encontrado ou senha incorreta:

```json
{
  "message": "Credenciais invalidas"
}
```

---

### 5.3. Rota de Teste — `GET /`

Rota de teste definida no servidor. Retorna `req.user`, que atualmente vem vazio ou nulo devido à ordem dos middlewares (ver [secção 9](#9-pontos-de-atenção-do-backend)).

---

## 6. Padrão de Erros

O backend implementa a classe base `AppError` (`src/errors/errors.ts`) e um middleware centralizado `errorHandling`.

**Formato padrão:**

```json
{
  "message": "Descrição amigável do erro",
  "details": "Objeto ou array com detalhes adicionais (ex.: erros Zod)"
}
```

> O campo `details` é opcional.

**Códigos HTTP utilizados:**

| Status | Classe de erro | Quando ocorre |
|---|---|---|
| `400` | `BadRequestError` / `AppError(400)` | Corpo mal formatado ou validação Zod falhou |
| `401` | `UnauthorizedError` | Credenciais inválidas; token ausente, expirado ou inválido |
| `404` | `NotFoundError` | Recurso não encontrado |
| `409` | `Conflict` | E-mail já existente na base de dados |
| `500` | Erro genérico | Erros não tratados (retorna `"Something went wrong!!"`) |

---

## 7. Tipos TypeScript para o Frontend

Pode copiar diretamente para o seu projeto (ex.: `src/types/api.ts`):

```typescript
// --- ENUMS & ROLES ---
export type UserRole = "student" | "teacher" | "admin";

// --- DTOs DE ENVIO ---
export interface RegisterStudentPayload {
  name: string;
  email: string;
  password: string;
  role: "student";
  course: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// --- RESPOSTAS DA API ---
export interface UserResponse {
  name: string;
  role: UserRole;
}

export interface AuthSuccessResponse {
  userResponse: UserResponse;
  token: string;
}

export interface ApiErrorResponse {
  message: string;
  details?: unknown;
}

// --- PAYLOAD DESCODIFICADO DO TOKEN JWT ---
export interface DecodedJwtPayload {
  user_id: number;
  role: UserRole;
  iat: number;
  exp: number;
}
```

---

## 8. Guia de Integração no Frontend

### 8.1. Axios com interceptor de autenticação

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9876",
  headers: {
    "Content-Type": "application/json",
  },
});

// Injeta o token em rotas autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@avaliae:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções de autenticação
export const authService = {
  async login(credentials: LoginPayload): Promise<AuthSuccessResponse> {
    const { data } = await api.post<AuthSuccessResponse>("/auth/login", credentials);
    localStorage.setItem("@avaliae:token", data.token);
    return data;
  },

  async registerStudent(payload: RegisterStudentPayload): Promise<AuthSuccessResponse> {
    const { data } = await api.post<AuthSuccessResponse>("/auth/register", payload);
    localStorage.setItem("@avaliae:token", data.token);
    return data;
  },

  logout() {
    localStorage.removeItem("@avaliae:token");
  },
};
```

### 8.2. Como obter o `user_id` no Frontend

O `userResponse` retorna atualmente apenas `name` e `role`. Se precisar do `user_id` (por exemplo, para associar itens criados pelo utilizador), descodifique o JWT com `jwt-decode`:

```bash
npm install jwt-decode
```

```typescript
import { jwtDecode } from "jwt-decode";
import { DecodedJwtPayload } from "./types/api";

export function getAuthUserFromToken(token: string): DecodedJwtPayload | null {
  try {
    return jwtDecode<DecodedJwtPayload>(token);
  } catch {
    return null;
  }
}
```

---

## 9. Pontos de Atenção do Backend

Diagnóstico do código-fonte atual — pontos que o frontend deve conhecer:

1. **Campos omitidos no `userResponse`**
   O `UserResponseMapper` descarta propositalmente `email`, `course` e `user_id`. Login e registo retornam apenas `{ name, role }`.

2. **Registo de Professor e Administrador pendente**
   Enviar `role: "teacher"` para `/auth/register` cai num bloco incompleto (`console.log("prof")`) e retorna `500`. Apenas o registo de `student` está funcional.

3. **`next()` duplicado no `AuthMiddleware`**
   Em `src/middlewares/auth.middleware.ts`, `next()` é chamado na linha 33 (dentro do `try`) e novamente na linha 46 (final da função). Pode causar avisos de cabeçalhos duplicados no Express caso novas rotas passem por ele.

4. **Ordem dos middlewares em `src/index.ts`**
   A rota `GET /` está registada **antes** de `app.use(AuthMiddleware)`. Novas rotas protegidas devem ser declaradas depois do middleware, ou aplicá-lo diretamente na rota:
   ```typescript
   router.get("/perfil", AuthMiddleware, ...)
   ```

5. **CORS restritivo (`http://localhost:3000`)**
   Se o frontend correr noutra porta (3001, 5173, etc.), configure um proxy reverso no frontend ou solicite a liberação no backend.

---

## 10. Configuração do MinIO (Storage Local)

O Avaliaê usa o **MinIO** (object storage compatível com a API do S3) para armazenar documentos e PDFs enviados. Na base de dados PostgreSQL ficam apenas a URL e os metadados.

### 10.1. Subir o container via Docker

Execute o comando abaixo ou adicione-o ao seu `docker-compose.yml`:

```bash
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=admin123" \
  minio/minio server /data --console-address ":9001"
```

### 10.2. Aceder ao painel e criar o bucket

1. Aceda a `http://localhost:9001`.
2. Faça login com **Username:** `admin` e **Password:** `admin123`.
3. No menu lateral, vá a **Buckets** e clique em **Create Bucket**.
4. Nomeie o bucket (ex.: `avaliae-docs`).
5. Nas configurações do bucket criado, altere a **Access Policy** para **Public**, para viabilizar a visualização e o download dos arquivos no frontend.

### 10.3. Criar as chaves de acesso

1. No menu lateral, aceda a **Access Keys** e clique em **Create access key**.
2. Copie a **Access Key** e a **Secret Key** geradas.
3. Substitua-as nas variáveis de ambiente do backend (`.env`), conforme a [secção 2.2](#22-variáveis-de-ambiente-env).