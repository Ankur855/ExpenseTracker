import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLiteDatabase;

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (db) return db;

  db = await SQLite.openDatabase({name: 'app.db', location: 'default'});
  return db;
};

export const closeDBConnection = async () => {
  if (db) {
    await db.close();
    db = undefined!;
  }
};
