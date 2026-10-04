const algorithms = new Set(['caesar', 'vigenere', 'atbash', 'xor']);

export function validateCipher(body) {
  const { text, algorithm, key } = body ?? {};
  if (typeof text !== 'string' || text.length === 0) return 'Text is required.';
  if (text.length > 10000) return 'Text must be 10,000 characters or fewer.';
  if (!algorithms.has(algorithm)) return 'Choose a valid encryption algorithm.';
  if (algorithm === 'caesar' && (key === '' || key === undefined || !Number.isInteger(Number(key)) || Number(key) < 0 || Number(key) > 25)) return 'Caesar key must be a whole number from 0 to 25.';
  if (algorithm === 'vigenere' && (typeof key !== 'string' || !/^[a-z]+$/i.test(key))) return 'Vigenère key must contain letters only.';
  if (algorithm === 'xor' && (typeof key !== 'string' || key.length === 0)) return 'XOR key is required.';
  return null;
}

export function validateHash(body) {
  if (typeof body?.text !== 'string' || body.text.length === 0) return 'Text is required.';
  if (body.text.length > 10000) return 'Text must be 10,000 characters or fewer.';
  return null;
}
