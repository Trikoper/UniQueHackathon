import { pipeline } from '@xenova/transformers';
import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

const title = 'Discuții deschise"';
const description = 'Se organizează o discuție deschisă cu partenerii universității, discuție în care veți putea da întrebări, primi răspunsuri și descoperi lucruri noi';
const tip = 'initiativa';

async function vectorize(text) {
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

const vector = await vectorize(`${title} + ${description}`);

// conectare cu DB
const db = new Database(`./${tip}.db`);
sqliteVec.load(db);

db.exec(`
  CREATE TABLE IF NOT EXISTS ${tip} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    likes NUMBER,
    embedding FLOAT[384]
  );
`);

// Serialize vector to Float32Array buffer for sqlite-vec
const embedding = new Float32Array(vector);

db.prepare(`INSERT INTO ${tip} (title, description, likes, embedding) VALUES (?, ?, ?, ?)`)
  .run(title, description, 7, embedding);