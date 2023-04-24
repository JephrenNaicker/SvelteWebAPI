import sqlite3 from 'sqlite3';

const db = '';//new sqlite3.Database(':memory:');

// db.serialize(() => {
//     db.run('CREATE DATABASE IF NOT EXISTS DBdecision');
//     db.run('USE DBdecision');
//     db.run(`CREATE TABLE IF NOT EXISTS decision (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       input TEXT NOT NULL,
//       decision TEXT NOT NULL,
//       meets_confidence INTEGER NOT NULL,
//       model TEXT NOT NULL,
//       timestamp TEXT NOT NULL,
//       confidence REAL NOT NULL
//     )`);
//   });

  export default db;