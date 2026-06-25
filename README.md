# web-potions

Web service de uma loja de poções (a "Botica das Sombras"), com site público e
área de administrador protegida por login. Construído com **Express**,
**Sequelize** e **SQLite em memória**, front-end em HTML/CSS/JS puro consumindo a
API via **AJAX**.

## Funcionalidades

- **Site público** (`/index.html`)
  - Índice fixo no canto superior direito (Descrição, Histórico, Produtos, Administrador)
  - Seções de descrição da loja e histórico (fundada em **1867**) com fotos
  - Seção de produtos: cada poção com imagem, nome, descrição, preço e botão
    **Comprar** (apenas visual, sem checkout)
  - Rodapé com informações de contato
- **Área de administrador** (`/admin.html`)
  - Login com **JWT** e **timeout de sessão** (token expira)
  - Cadastrar, listar e remover poções
- **Banco de dados**: SQLite em memória via Sequelize (recriado e populado com
  poções de exemplo a cada inicialização)

## Stack

Express · Sequelize · sqlite3 · jsonwebtoken · bcryptjs · dotenv · (dev) nodemon

## Pré-requisitos

- **Node.js** LTS (18, 20, 22 ou superior) — inclui o `npm`

## Instalação

```bash
npm install
```

> Se o `sqlite3` reclamar de versão do GLIBC ao iniciar, recompile o binário
> nativo para a sua máquina:
> ```bash
> npm rebuild sqlite3 --build-from-source
> ```

## Configuração

1. Copie o arquivo de exemplo e ajuste:
   ```bash
   cp .env.example .env
   ```
2. Defina a senha do administrador (valida a complexidade e gera o hash):
   ```bash
   npm run set-admin -- "SuaSenhaForte1!"
   ```
   A senha deve ter no mínimo **8 caracteres, 1 número, 1 letra maiúscula e 1
   caractere especial**. Copie a linha `ADMIN_PASSWORD_HASH='...'` impressa para
   o seu `.env` (mantenha as **aspas simples**).
3. Ajuste, se quiser, `JWT_SECRET`, `TOKEN_EXPIRES_IN` (ex.: `15m`, `1h`),
   `PORT` e `ADMIN_USERNAME`.

## Executando

```bash
npm run dev    # desenvolvimento, com reload automático (nodemon)
# ou
npm start      # produção
```

Acesse:
- Site: `http://localhost:3000/`
- Admin: `http://localhost:3000/admin.html`

## API

| Método | Rota                 | Acesso     | Descrição                          |
| ------ | -------------------- | ---------- | ---------------------------------- |
| POST   | `/api/auth/login`    | público    | Autentica e retorna um JWT         |
| GET    | `/api/potions`       | público    | Lista todas as poções             |
| POST   | `/api/potions`       | protegido  | Cadastra uma poção                |
| DELETE | `/api/potions/:id`   | protegido  | Remove uma poção                  |

Rotas protegidas exigem o header `Authorization: Bearer <token>`. Tokens
expirados retornam `401`, e o front-end volta automaticamente para a tela de
login.

## Estrutura

```
config/database.js   Instância Sequelize (SQLite :memory:)
models/potion.js     Modelo Potion (name, description, price, image)
models/index.js      sync() + seed na inicialização
seed.js              Poções de exemplo
middleware/auth.js   Verificação do JWT
utils/password.js    Validação de complexidade de senha
scripts/set-admin.js Gera o hash bcrypt da senha do admin
routes/auth.js       Login (JWT)
routes/potions.js    CRUD de poções
server.js            Configuração do Express e inicialização
public/              Front-end (index.html, admin.html, css, js)
```

## Observações

- O banco é **em memória**: ao reiniciar o servidor, as poções cadastradas são
  perdidas e o seed de exemplo é recriado.
- O administrador é **único** e fica no `.env` (não há tabela de usuários).
- O arquivo `.env` não deve ser versionado (já está no `.gitignore`).
