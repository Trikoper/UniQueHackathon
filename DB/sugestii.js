import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'sugestii.db'));

export function getAll() {
  return db.prepare('SELECT * FROM sugestii').all();
}

export function addLike(id) {
  return db.prepare('UPDATE sugestii SET likes = likes + 1 WHERE id = ?').run(id);
}