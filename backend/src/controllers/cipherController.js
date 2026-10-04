import { atbash, caesar, sha256, vigenere, xorDecrypt, xorEncrypt } from '../services/ciphers.js';
import { recordOperation, recentOperations } from '../services/history.js';
import { validateCipher, validateHash } from '../utils/validation.js';

function transform(text, algorithm, key, decrypt) {
  if (algorithm === 'caesar') return caesar(text, key, decrypt);
  if (algorithm === 'vigenere') return vigenere(text, key, decrypt);
  if (algorithm === 'atbash') return atbash(text);
  return decrypt ? xorDecrypt(text, key) : xorEncrypt(text, key);
}
export async function cipher(req, res, next) {
  const validationError = validateCipher(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  if (req.params.operation === 'decrypt' && req.body.algorithm === 'xor' &&
    (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(req.body.text))) {
    return res.status(400).json({ error: 'XOR ciphertext must be valid Base64.' });
  }
  try {
    const result = transform(req.body.text, req.body.algorithm, req.body.key, req.params.operation === 'decrypt');
    await recordOperation({ algorithm: req.body.algorithm, operation: req.params.operation, inputLength: req.body.text.length, outputLength: result.length });
    return res.json({ result });
  } catch (error) { return next(error); }
}
export async function hash(req, res, next) {
  const validationError = validateHash(req.body);
  if (validationError) return res.status(400).json({ error: validationError });
  try {
    const result = sha256(req.body.text);
    await recordOperation({ algorithm: 'sha256', operation: 'hash', inputLength: req.body.text.length, outputLength: result.length });
    return res.json({ result });
  } catch (error) { return next(error); }
}
export async function history(req, res, next) { try { res.json({ operations: await recentOperations() }); } catch (error) { next(error); } }
