import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';



//conectare cu DB
const db = new Database('./initiativa.db');
sqliteVec.load(db); // load vector extension

db.exec(`
  CREATE TABLE IF NOT EXISTS initiativa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    likes NUMBER,
    vector TEXT
  );
`);

// INSERT
db.prepare('INSERT INTO initiativa(title, description, likes) VALUES (?, ?, ?)')
  .run('competitie sportiva', 'o zi speciala pe toate universitatea cu competitii si jocuri vesele sportive', 8);

// // SELECT all
// const rows = db.prepare('SELECT * FROM sugestii').all();
// rows.forEach(row => console.log(row));

// // SELECT one
// const row = db.prepare('SELECT * FROM sugestii WHERE id = ?').get(1);
// console.log(row);

// // UPDATE
// db.prepare('UPDATE sugestii SET title = ? WHERE id = ?')
//   .run('new title', 1);

// // DELETE
// db.prepare('DELETE FROM sugestii WHERE id = ?')
//   .run(1);