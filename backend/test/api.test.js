import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('cipher API returns a transformed result', async () => {
  const response = await request(app).post('/api/cipher/encrypt').send({ text: 'Abc', algorithm: 'caesar', key: 1 });
  assert.equal(response.status, 200); assert.equal(response.body.result, 'Bcd');
});
test('hash API returns a digest and invalid input is a 400', async () => {
  const valid = await request(app).post('/api/hash').send({ text: 'hello' });
  assert.equal(valid.status, 200); assert.equal(valid.body.result.length, 64);
  const invalid = await request(app).post('/api/cipher/encrypt').send({ text: 'x', algorithm: 'unknown', key: '' });
  assert.equal(invalid.status, 400); assert.match(invalid.body.error, /valid/i);
});
