# CipherLab

CipherLab is a portfolio-ready, educational full-stack app for experimenting with classic ciphers and SHA-256. It is deliberately explicit about the distinction between reversible encryption and one-way hashing.

## Features

- Caesar, Vigenère, Atbash, and repeating-key XOR encryption/decryption
- SHA-256 hashing (no deceptive “decrypt” option)
- Accessible responsive React interface with validation, loading states, copy, clear, and swap controls
- Express API with Helmet, restrictive CORS, request-size limits, rate limiting, validation, and safe errors
- PostgreSQL migration and safe operation metadata history; no plaintext, output, or keys are persisted
- Node tests for cipher logic and invalid input

## Architecture

```text
React + Vite frontend → Express REST API → PostgreSQL (metadata only)
                         ↳ cipher/hash services
```

## Install and run

1. Copy `.env.example` to `.env` and update `DATABASE_URL`.
2. Create a PostgreSQL database named `cipherlab` and run `database/migrations/001_create_operations.sql` with `psql`.
3. Run `npm install` at the repository root.
4. Run `npm run dev`; open `http://localhost:5173`.

Useful commands:

```bash
npm run test
npm run build
npm run start
```

## API

`POST /api/cipher/encrypt` and `POST /api/cipher/decrypt` take `{ text, algorithm, key }`. Supported algorithms are `caesar`, `vigenere`, `atbash`, and `xor`.

`POST /api/hash` takes `{ text }`. `GET /api/history` returns no sensitive content—only algorithm, operation, lengths, and timestamps.

## Security and limitations

This application is educational. Caesar, Vigenère, Atbash, and repeating-key XOR are not secure modern encryption and must never protect real credentials, health data, payments, or private messages. SHA-256 is an appropriate digest primitive, but raw SHA-256 is not password storage—use Argon2id or bcrypt with per-password salts for authentication. A future AES/RSA feature should use established, audited library or Web Crypto APIs, never custom cryptographic math.

The database schema includes a future `users` table but version 1 does not implement authentication. History storage activates only when `DATABASE_URL` is set; the tool itself still works without it.

## Deployment

Deploy the static Vite build to a CDN/host, the Express API behind HTTPS on a managed container service, and PostgreSQL through a managed private database. Set `CLIENT_ORIGIN`, `DATABASE_URL`, and `NODE_ENV=production` as deployment secrets; run the migration during release. Do not commit `.env` files.

## GitHub

```bash
git add .
git commit -m "Build CipherLab full-stack app"
git branch -M main
git remote add origin https://github.com/YOUR_USER/cipherlab.git
git push -u origin main
```
