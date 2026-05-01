import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'initiativa.db'));

export function getAllInit() {
  return db.prepare('SELECT * FROM initiativa').all();
}

export function addLikeInit(id) {
  return db.prepare('UPDATE initiativa SET likes = likes + 1 WHERE id = ?').run(id);
}