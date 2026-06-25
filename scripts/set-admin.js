// Gera o hash bcrypt da senha do administrador, validando a complexidade.
// Uso: npm run set-admin -- "SuaSenhaForte1!"
const bcrypt = require('bcryptjs');
const { isStrongPassword, COMPLEXITY_MESSAGE } = require('../utils/password');

const password = process.argv[2];

if (!password) {
  console.error('Uso: npm run set-admin -- "SuaSenhaForte1!"');
  process.exit(1);
}

if (!isStrongPassword(password)) {
  console.error('Senha fraca. ' + COMPLEXITY_MESSAGE);
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

// O hash bcrypt contém '$', então usamos aspas simples para o leitor de .env
// não interpretar como expansão de variável.
console.log('\nSenha válida! Copie a linha abaixo para o seu arquivo .env:\n');
console.log("ADMIN_PASSWORD_HASH='" + hash + "'\n");
