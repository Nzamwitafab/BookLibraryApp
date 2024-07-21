import * as SQLite from 'expo-sqlite';

const dbName = 'BookLibrary1.db';
export const createTables = async () => {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        rating INTEGER,
        read INTEGER,
        image TEXT,
        date TEXT,
        type TEXT
      );
    `);

};


export const getBooks = async() => { 
    const db = await SQLite.openDatabaseAsync(dbName);
    return await db.getAllAsync('SELECT * FROM books'); 
};

export const addBook = async (book) => {
    const db = await SQLite.openDatabaseAsync(dbName);
    const result = await db.runAsync('INSERT INTO books (title, author, rating, read, image, date, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [book.title, book.author, book.rating, book.read, book.image, book.date, book.type]);
  return result.lastInsertRowId > 0;

};

export const updateBook = async (book) => {
    const db = await SQLite.openDatabaseAsync(dbName);
    const result = await db.runAsync('UPDATE books SET title = ?, author = ?, rating = ?, read = ?, image = ?, date = ?, type = ? WHERE id = ?',
        [book.title, book.author, book.rating, book.read, book.image, book.date, book.type, book.id]);
  return result.lastInsertRowId > 0;

};

export const deleteBook = async (id) => {
    const db = await SQLite.openDatabaseAsync(dbName);
    const result = await db.runAsync('DELETE FROM books WHERE id = ?', [id]);
  return result.lastInsertRowId > 0;

};