import {getDBConnection} from './database';

export const createTable = async () => {
  const db = await getDBConnection();
  await db.executeSql(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      class TEXT
    );`);
};
