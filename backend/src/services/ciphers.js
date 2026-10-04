import crypto from 'node:crypto';

const letter = (character) => /[a-z]/i.test(character);
const rotate = (character, shift) => {
  if (!letter(character)) return character;
  const start = character === character.toUpperCase() ? 65 : 97;
  return String.fromCharCode(((character.charCodeAt(0) - start + shift + 26) % 26) + start);
};

export function caesar(text, key, decrypt = false) {
  const shift = Number(key) * (decrypt ? -1 : 1);
  return [...text].map((character) => rotate(character, shift)).join('');
}

export function vigenere(text, key, decrypt = false) {
  let index = 0;
  return [...text].map((character) => {
    if (!letter(character)) return character;
    const shift = key[index++ % key.length].toLowerCase().charCodeAt(0) - 97;
    return rotate(character, decrypt ? -shift : shift);
  }).join('');
}

export function atbash(text) {
  return [...text].map((character) => {
    if (!letter(character)) return character;
    const start = character === character.toUpperCase() ? 65 : 97;
    return String.fromCharCode(start + 25 - (character.charCodeAt(0) - start));
  }).join('');
}

// XOR output is Base64 so it can safely move through JSON and text fields.
export function xorEncrypt(text, key) {
  const input = Buffer.from(text, 'utf8');
  const keyBytes = Buffer.from(key, 'utf8');
  return Buffer.from(input.map((value, index) => value ^ keyBytes[index % keyBytes.length])).toString('base64');
}
export function xorDecrypt(base64, key) {
  const input = Buffer.from(base64, 'base64');
  const keyBytes = Buffer.from(key, 'utf8');
  return Buffer.from(input.map((value, index) => value ^ keyBytes[index % keyBytes.length])).toString('utf8');
}
export const sha256 = (text) => crypto.createHash('sha256').update(text, 'utf8').digest('hex');
