import pg from 'pg';

let pool;
function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });
  return pool;
}

export async function recordOperation(metadata) {
  const db = getPool();
  if (!db) return;
  await db.query('INSERT INTO operations (algorithm, operation, input_length, output_length) VALUES ($1, $2, $3, $4)', [metadata.algorithm, metadata.operation, metadata.inputLength, metadata.outputLength]);
}
export async function recentOperations() {
  const db = getPool();
  if (!db) return [];
  const { rows } = await db.query('SELECT id, algorithm, operation, input_length AS "inputLength", output_length AS "outputLength", created_at AS "createdAt" FROM operations ORDER BY created_at DESC LIMIT 20');
  return rows;
}
