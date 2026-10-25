# 📚 Documentação Técnica da API - Backend (Avaliaê)

Esta documentação foi elaborada para o time de Frontend e para servir como base de contexto para ferramentas de IA assistentes. Ela contém todas as definições de rotas, contratos de dados (payloads/respostas), modelo de banco, autenticação, tipos TypeScript e observações críticas para a integração.

---

## 1. Visão Geral da Arquitetura

- **Ambiente de Execução**: Node.js com TypeScript e ESM nativo (`"type": "module"`).
- **Framework Web**: Express 5 (`^5.2.1`).
- **ORM / Banco de Dados**: TypeORM com PostgreSQL 15.
- **Validação de Schemas**: Zod (`^4.6.7`).
- **Autenticação**: JWT (`jsonwebtoken`) + Hashing com `bcrypt` (10 rounds).
- **Porta Padrão do Servidor**: `9876`.
- **URL Base**: `http://localhost:9876`.

---

## 2. Configurações de Rede, CORS e Ambiente

### Configurações de CORS (`src/index.ts`)
A API está configurada com a biblioteca `cors` com as seguintes regras:
- **Origem Permitida (`origin`)**: `http://localhost:3000`
- **Métodos Permitidos**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`
- **Headers Permitidos**: `Content-Type`, `Authorization`

> [!WARNING]
> **Alerta para o Frontend**:
> Se a sua aplicação frontend estiver rodando em uma porta diferente (por exemplo, `http://localhost:5173` no Vite ou `http://localhost:5174`), ocorrerá **erro de CORS**.
> **Soluções recomendadas:**
> 1. Configurar um proxy no `vite.config.ts` (redirecionando chamadas `/api` para `http://localhost:9876`), ou
> 2. Rodar o frontend na porta `3000`, ou
> 3. Solicitar ao backend que adicione sua porta no array de origens do CORS.

### Variáveis de Ambiente do Backend (`.env`)
```env
DB_HOST="localhost"
DB_NAME="avaliae_db"
DB_USER="narciso"
DB_PASSWORD="123"
DATABASE_URL="postgres://narciso:123@localhost:5432/avaliae_db"
JWT_SECRET=bUW3iGlPOjSj1c_VM65bg4OQwTtJMvBsR-XiwvzDdyA
```

---

## 3. Modelo de Dados e Entidades

O backend utiliza o padrão de **herança/composição via relação 1 para 1**:
- Existe uma tabela base de usuários chamada `generic_user`.
- Dados específicos de perfis especializados ficam em tabelas dedicadas ligadas por chave estrangeira (atualmente `student`).

### Diagrama Entidade-Relacionamento

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

### Roles Suportadas
```typescript
export type UserTypeRoles = "student" | "teacher" | "admin";
```
- `"student"`: Totalmente mapeado no banco e nas rotas.
- `"teacher"`: Previsto no enum e tabelas, mas a rota de cadastro ainda não está finalizada.
- `"admin"`: Previsto no enum, sem lógica específica implementada ainda.

---

## 4. Autenticação e Autorização (JWT)

### Geração do Token (`createToken.ts`)
- O token é gerado com expiração de **60 minutos** (`expiresIn: "60m"`).
- Algoritmo: HMAC SHA256 padrão com `JWT_SECRET`.
- **Payload contido no Token JWT**:
  ```typescript
  interface TokenPayload {
    user_id: number;
    role: "student" | "teacher" | "admin";
    iat: number;
    exp: number;
  }
  ```

### Envio do Token pelo Frontend
Para rotas protegidas que utilizam o `AuthMiddleware`, o token deve ser enviado no cabeçalho HTTP:
```http
Authorization: Bearer <TOKEN_JWT_AQUI>
```

### Comportamento do `AuthMiddleware`
- Verifica a presença do cabeçalho `Authorization`.
- Rejeita formatos diferentes de `Bearer <token>`.
- Valida o token e decodifica o usuário.
- Se inválido ou expirado, retorna `401 Unauthorized`.

---

## 5. Especificação Completa dos Endpoints (API Reference)

### 5.1. Registro de Aluno (`POST /auth/register`)

Cadastra um novo usuário com perfil de estudante (`role: "student"`).

- **URL**: `/auth/register`
- **Método**: `POST`
- **Autenticação Requerida**: Nenhuma (Rota pública)
- **Content-Type**: `application/json`

#### Corpo da Requisição (Request Body)
```json
{
  "name": "Maria Silva",
  "email": "maria@ufc.br",
  "password": "senhaForte123",
  "role": "student",
  "course": "Engenharia de Software"
}
```

#### Regras de Validação (Zod Schema)
| Campo | Tipo | Validação | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Obrigatório | Nome completo do usuário |
| `email` | `string` | Formato de e-mail válido | E-mail do usuário (único) |
| `password` | `string` | Mínimo 8 caracteres | Senha de acesso |
| `role` | `string` | Deve ser `"student"` | Perfil de acesso |
| `course` | `string` | Obrigatório se `student` | Curso do aluno |

#### Resposta de Sucesso (`201 Created`)
```json
{
  "userResponse": {
    "name": "Maria Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAzNjAwfQ..."
}
```

#### Respostas de Erro
- **`400 Bad Request`** - Validação de schema falhou:
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
- **`409 Conflict`** - E-mail já utilizado:
  ```json
  {
    "message": "Usuario ja cadastrado."
  }
  ```
- **`500 Internal Server Error`** - Erro inesperado ou se tentar registrar com `role: "teacher"` (pois o cadastro de professor ainda não está implementado).

---

### 5.2. Login de Usuário (`POST /auth/login`)

Autentica qualquer usuário previamente cadastrado (`student`, `teacher`, `admin`).

- **URL**: `/auth/login`
- **Método**: `POST`
- **Autenticação Requerida**: Nenhuma (Rota pública)
- **Content-Type**: `application/json`

#### Corpo da Requisição (Request Body)
```json
{
  "email": "maria@ufc.br",
  "password": "senhaForte123"
}
```

#### Regras de Validação (Zod Schema)
| Campo | Tipo | Validação |
| :--- | :--- | :--- |
| `email` | `string` | E-mail válido |
| `password` | `string` | Mínimo 8 caracteres |

#### Resposta de Sucesso (`200 OK`)
```json
{
  "userResponse": {
    "name": "Maria Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Respostas de Erro
- **`400 Bad Request`** - Dados fora do padrão:
  ```json
  {
    "message": "E-mail ou senha mal formatados"
  }
  ```
- **`401 Unauthorized`** - E-mail não encontrado ou senha incorreta:
  ```json
  {
    "message": "Credenciais invalidas"
  }
  ```

---

### 5.3. Rota de Teste / Root (`GET /`)

Rota de teste definida no servidor.

- **URL**: `/`
- **Método**: `GET`
- **Resposta**: Retorna `req.user` (atualmente retorna vazio ou nulo devido à ordem dos middlewares).

---

## 6. Padrão de Erros da API

O backend implementa a classe base `AppError` (`src/errors/errors.ts`) e um middleware centralizado `errorHandling`.

### Formato Padrão de Erro da API:
```json
{
  "message": "Descrição amigável do erro",
  "details": "Objeto ou array contendo detalhes adicionais (ex: erros Zod)" // Opcional
}
```

### Códigos HTTP Utilizados:
| Status | Classe de Erro | Quando Ocorre |
| :--- | :--- | :--- |
| **`400`** | `BadRequestError` / `AppError(400)` | Corpo mal formatado, validação do Zod falhou |
| **`401`** | `UnauthorizedError` | Credenciais inválidas, token ausente, expirado ou inválido |
| **`404`** | `NotFoundError` | Recurso não encontrado |
| **`409`** | `Conflict` | E-mail já existente no banco de dados |
| **`500`** | Erro genérico | Erros não tratados (retorna `"Something went wrong!!"`) |

---

## 7. Interfaces TypeScript para o Frontend

Você pode copiar diretamente estas definições de tipos para seu projeto frontend (ex: `src/types/api.ts`):

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

// --- PAYLOAD DECODIFICADO DO TOKEN JWT ---
export interface DecodedJwtPayload {
  user_id: number;
  role: UserRole;
  iat: number;
  exp: number;
}
```

---

## 8. Guia Prático de Integração no Frontend

### Exemplo com Axios e Interceptor de Autenticação

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9876",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para injetar o Token em rotas autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@avaliae:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções de Autenticação
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

### Como obter o `user_id` no Frontend
O `userResponse` retornado atualmente contém apenas `name` e `role`.
Se você precisar do `user_id` no frontend (por exemplo, para associar itens criados pelo usuário), você pode decodificar o token JWT usando bibliotecas como `jwt-decode`:

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

## 9. Diagnóstico do Backend: Pontos de Atenção & Alertas Técnicos

Ao analisar o código-fonte atual do backend, identificamos pontos importantes que a equipe de frontend deve ter ciência:

1. **Campos omitidos no `userResponse`**:
   - `UserResponseMapper` propositalmente descarta `email`, `course` e `user_id`. Apenas `{ name, role }` é retornado no login e cadastro.
2. **Cadastro de Professor e Administrador pendente**:
   - Se o frontend enviar `role: "teacher"` para `/auth/register`, o backend cairá em um bloco incompleto (`console.log("prof")`) e retornará **status 500**. Atualmente, **somente cadastro de `student` está funcional**.
3. **Double `next()` no `AuthMiddleware`**:
   - No arquivo `src/middlewares/auth.middleware.ts`, o método `next()` é chamado na linha 33 (dentro do `try`) e novamente na linha 46 (ao final da função). Isso pode causar advertências de headers duplicados no Express caso novas rotas passem por ele.
4. **Ordem dos Middlewares em `src/index.ts`**:
   - A rota `GET /` está registrada antes do `app.use(AuthMiddleware)`. Se forem adicionadas novas rotas protegidas no futuro, elas precisarão ser declaradas após o middleware ou com o middleware aplicado diretamente na rota (`router.get("/perfil", AuthMiddleware, ...)`).
5. **CORS Restritivo (`http://localhost:3000`)**:
   - O CORS está limitado à porta 3000. Se seu frontend rodar em outra porta (3001, 5173, etc.), configure um proxy reverso no frontend ou solicite a liberação no backend.
