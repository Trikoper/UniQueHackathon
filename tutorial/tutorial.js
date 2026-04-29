import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
let sql;


//conectare cu DB
const db = new sqlite.Database('./tutorial.db', sqlite3.OPEN_READWRITE, err =>{
    if(err) return console.error(err.message)
});
//creare tabel
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
// db.run(sql);
// ---sau---- dar mai bine asta de sus
//drop tabel
//db.run("DROP TABLE users")

//Insert data into table
// sql = `INSERT INTO users(first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`;
// db.run(sql, ["iulian", "petrache", "iulicik", "4321", "petrache.iulian@usm.md"], (err) =>{
//     if(err) return console.error(err.message)
// })

// //Update data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`
// db.all(sql, ["sorin", 1], (err) => {
//     if(err) return console.error(err.message)
// }) 

// Delete data
// sql = `DELETE FROM users WHERE id = ?`
// db.all(sql, [1], (err) => {
//     if(err) return console.error(err.message)
// }) 

//query data
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message)
    rows.forEach(row => console.log(row))
}) 