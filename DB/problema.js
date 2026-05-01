import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'problema.db'));

export function getAllProb() {
  return db.prepare('SELECT * FROM problema').all();
}

export function addLikeProb(id) {
  return db.prepare('UPDATE problema SET likes = likes + 1 WHERE id = ?').run(id);
}