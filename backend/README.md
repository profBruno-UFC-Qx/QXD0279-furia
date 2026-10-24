# Backend API - Fúria

Este documento descreve todas as rotas da API REST do backend, incluindo autenticação, permissões, payloads e exemplos de uso para importar em ferramentas como Postman e gerar coleções por IA.

## 1. Base URL

- Local: `http://localhost:9876`
- Variável do Postman: `{{baseUrl}} = http://localhost:9876`

## 2. Autenticação

A API usa JWT em header:

```http
Authorization: Bearer <token>
```

O token é retornado nas rotas de login e registro.

### Roles suportados

- `student`
- `teacher`
- `admin`

### Middleware de autorização

Algumas rotas exigem permissão específica:

- `AutorizationMiddleware(["student"])`
- `AutorizationMiddleware(["admin"])`
- `AutorizationMiddleware(["teacher"])` (quando usado em alguma rota futura)

## 3. Formato de resposta de erro

Erros seguem esse padrão:

```json
{
  "message": "Mensagem de erro",
  "details": {}
}
```

Códigos comuns:

- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `404` Not Found
- `409` Conflict

## 4. Rotas públicas e protegidas

### 4.1 Auth

#### POST `/auth/register`

Cria um usuário e retorna token JWT.

Tipos válidos de role:

- `student`
- `teacher`

##### Payload student

```json
{
  "name": "Joao Silva",
  "email": "joao@email.com",
  "password": "12345678",
  "role": "student",
  "course": "Engenharia de Software"
}
```

##### Payload teacher

```json
{
  "name": "Maria Souza",
  "email": "maria@email.com",
  "password": "12345678",
  "role": "teacher",
  "disciplines": [1, 2, 3]
}
```

##### Resposta esperada

```json
{
  "userResponse": {
    "name": "Joao Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/login`

Realiza login do usuário.

```json
{
  "email": "joao@email.com",
  "password": "12345678"
}
```

Resposta:

```json
{
  "userResponse": {
    "name": "Joao Silva",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4.2 Student

#### GET `/student?page=1&limit=10`

Lista estudantes paginados.

Parâmetros query:

- `page` (opcional, padrão `1`)
- `limit` (opcional, padrão `100`)

Resposta:

```json
{
  "data": [
    {
      "student_id": 1,
      "course": "Engenharia de Software",
      "user": {
        "user_id": 1,
        "name": "Joao Silva",
        "email": "joao@email.com",
        "role": "student"
      }
    }
  ],
  "limit": 10,
  "offset": 0,
  "page": 1,
  "total": 1,
  "totalPages": 1
}
```

#### GET `/student/:id`

Busca um estudante pelo ID.

Exemplo:

```http
GET {{baseUrl}}/student/1
```

#### PUT `/student/:id`

Atualiza um estudante.

Requer autenticação de `admin`.

Payload parcial:

```json
{
  "name": "Joao Atualizado",
  "email": "joao.novo@email.com",
  "password": "87654321",
  "role": "student",
  "course": "Ciência da Computação"
}
```

#### DELETE `/student/:id`

Remove o usuário associado ao estudante.

Requer autenticação de `admin`.

> Observação: com a cascata do banco, ao apagar o `User`, o `Student` relacionado é removido automaticamente.

Resposta esperada:

```http
204 No Content
```

---

### 4.3 Teacher

#### GET `/teacher?page=1&limit=10`

Lista professores paginados.

#### GET `/teacher/:id`

Busca professor por ID.

#### PUT `/teacher/:id`

Atualiza um professor.

Requer autenticação de `admin`.

Payload parcial:

```json
{
  "name": "Maria Atualizada",
  "email": "maria.nova@email.com",
  "password": "87654321",
  "role": "teacher",
  "disciplines": [1, 4]
}
```

#### DELETE `/teacher/:id`

Remove o usuário associado ao professor.

Requer autenticação de `admin`.

> Observação: ao apagar o `User`, o `Teacher` relacionado é removido automaticamente pela cascata.

Resposta esperada:

```http
204 No Content
```

---

### 4.4 Discipline

Observação: a rota está registrada com o nome `dicipline` (com typo, seguindo o padrão atual do projeto).

#### POST `/dicipline`

Cria uma disciplina.

```json
{
  "name": "Algoritmos",
  "course": "Engenharia de Software",
  "hours": 40
}
```

#### GET `/dicipline?page=1&limit=10`

Lista disciplinas paginadas.

---

### 4.5 Avaliação

#### POST `/avaliacao`

Cria uma avaliação.

Requer autenticação de `student`.

```json
{
  "name": "Avaliação 1",
  "course": "Engenharia de Software",
  "hours": 4,
  "nota_geral": 8.5,
  "nota_didatica": 9.0,
  "nota_metodologia": 8.0,
  "comment": "Excelente desempenho geral.",
  "estudante_id": 1,
  "professor_id": 1,
  "disciplina_id": 1
}
```

#### GET `/avaliacao?page=1&limit=10`

Lista avaliações paginadas.

#### GET `/avaliacao/:id`

Busca avaliação por ID.

#### PUT `/avaliacao/:id`

Atualiza uma avaliação.

Requer autenticação de `admin`.

Payload parcial:

```json
{
  "nota_geral": 9.5,
  "comment": "Comentário atualizado pela coordenação."
}
```

#### DELETE `/avaliacao/:id`

Remove uma avaliação.

Requer autenticação de `admin`.

Resposta esperada:

```http
204 No Content
```

---

## 5. Rotas base da aplicação

Além das rotas principais, a aplicação também expõe:

#### GET `/`

Requer autenticação de `student`.

Retorna o usuário autenticado a partir do token.

Exemplo de retorno:

```json
{
  "id": 1,
  "role": "student"
}
```

## 6. Exemplo de coleção Postman

### Variáveis de ambiente

```json
{
  "baseUrl": "http://localhost:9876",
  "token": ""
}
```

### Fluxo recomendado

1. Registrar usuário:
   - `POST {{baseUrl}}/auth/register`
2. Capturar token da resposta
3. Colocar no header:

```http
Authorization: Bearer {{token}}
```

4. Chamar rotas protegidas

## 7. Observações relevantes

- O backend usa Express com JSON.
- Todo body deve ser enviado como `application/json`.
- Os endpoints de listagem usam paginação por `page` e `limit`.
- O nome da rota de disciplina está com grafia `dicipline`, totalmente em conformidade com a estrutura atual do projeto.
- Para rotas admin, o token precisa pertencer a um usuário com `role = "admin"`.

## 8. Modelo de dados principal

### User

```json
{
  "user_id": 1,
  "name": "Nome",
  "email": "email@email.com",
  "password": "hash",
  "role": "student"
}
```

### Student

```json
{
  "student_id": 1,
  "course": "Engenharia de Software",
  "user": {}
}
```

### Teacher

```json
{
  "teacher_id": 1,
  "creat_at": "2026-10-23T00:00:00.000Z",
  "user": {},
  "disciplines": []
}
```

### Avaliacao

```json
{
  "id": 1,
  "name": "Avaliação 1",
  "course": "Engenharia de Software",
  "hours": 4,
  "nota_geral": 8.5,
  "nota_didatica": 9,
  "nota_metodologia": 8,
  "comment": "Excelente",
  "creat_at": "2026-10-23T00:00:00.000Z",
  "estudante_id": 1,
  "professor_id": 1,
  "disciplina_id": 1
}
```

---

Se você quiser, este README também pode ser convertido em uma coleção OpenAPI/Swagger mais formal futuramente, mas como está, já entrega as informações necessárias para o Postman ou para uma IA gerar requests automaticamente.
