const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// POST /api/auth/login
// Compara as credenciais com as do .env (admin único) e emite um JWT com
// expiração (timeout da sessão).
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Informe usuário e senha.' });
  }

  const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH, JWT_SECRET, TOKEN_EXPIRES_IN } =
    process.env;

  if (!ADMIN_PASSWORD_HASH) {
    return res.status(500).json({
      error:
        'Admin não configurado. Gere o hash com "npm run set-admin" e preencha o .env.',
    });
  }

  const userOk = username === ADMIN_USERNAME;
  const passOk = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!userOk || !passOk) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
  }

  const token = jwt.sign({ sub: username, role: 'admin' }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN || '15m',
  });

  res.json({ token, expiresIn: TOKEN_EXPIRES_IN || '15m' });
});

module.exports = router;
