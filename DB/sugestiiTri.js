import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';

const db = new Database('./sugestii.db');
sqliteVec.load(db); // loads the vector extension

// Create table
db.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS idea_vectors USING vec0(
    id INTEGER PRIMARY KEY,
    embedding FLOAT[384]  -- 384 = MiniLM output size
  );
`);

// Store a vector
function saveVector(id, vector) {
  const save = db.prepare('INSERT INTO idea_vectors(id, embedding) VALUES (?, ?)');
  save.run(id, new Float32Array(vector));
}

// Find most similar ideas to a query vector
function findSimilar(queryVector, limit = 3) {
  const stmt = db.prepare(`
    SELECT id, distance
    FROM idea_vectors
    WHERE embedding MATCH ?
    ORDER BY distance
    LIMIT ?
  `);
  return stmt.all(new Float32Array(queryVector), limit);
}