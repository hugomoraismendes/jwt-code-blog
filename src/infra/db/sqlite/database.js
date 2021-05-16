const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/infra/db/sqlite/db.sqlite');

const schemaPost = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(140)
  )
  `;

const schemaUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pwdHash VARCHAR(255) NOT NULL
  )
  `;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(schemaPost);
  db.run(schemaUsers);

  db.each('SELECT * FROM users', (err, user) => {
    console.log('User: ');
    console.log(user);
  });
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
