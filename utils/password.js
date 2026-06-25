// Regra de complexidade: mínimo 8 caracteres, ao menos 1 número, 1 letra
// maiúscula e 1 caractere especial (não alfanumérico).
const COMPLEXITY_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const COMPLEXITY_MESSAGE =
  'A senha deve ter ao menos 8 caracteres, incluindo 1 número, 1 letra maiúscula e 1 caractere especial.';

function isStrongPassword(password) {
  return typeof password === 'string' && COMPLEXITY_REGEX.test(password);
}

module.exports = { isStrongPassword, COMPLEXITY_MESSAGE, COMPLEXITY_REGEX };
