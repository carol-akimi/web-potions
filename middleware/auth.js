const jwt = require('jsonwebtoken');

// Protege rotas exigindo um JWT válido no header Authorization: Bearer <token>.
// Token expirado/inválido => 401 (o front-end volta para a tela de login).
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token ausente.' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Sessão expirada ou token inválido.' });
  }
}

module.exports = auth;
