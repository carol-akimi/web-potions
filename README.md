# Web Potions - Poções e Soluções

## Pré-requisitos

- **Node.js** LTS (18, 20, 22 ou superior) — inclui o `npm`

## Instalação

```bash
npm install
```

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

## Executando

```bash
npm run dev    # desenvolvimento, com reload automático (nodemon)
# ou
npm start      # produção
```
### Observação
Caso seu sistema operacional seja um Linux muito antigo, pode acontecer o problema a seguir:
O `sqlite3` pode reclamar de versão do GLIBC ao iniciar, se for o caso, recompile o binário nativo para a sua máquina:
```bash
npm rebuild sqlite3 --build-from-source
```

Acesse:
- Site: `http://localhost:3000/`
- Admin: `http://localhost:3000/admin.html`

## Acesse o admin
- Usuário: admin
- Senha: utilizar senha cadastrada anteriormente

## Observações

- O banco é **em memória**: ao reiniciar o servidor, as poções cadastradas são
  perdidas e o seed de exemplo é recriado.
- O administrador é **único** e fica no `.env` (não há tabela de usuários).
