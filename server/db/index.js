import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

const sqlite = new Database('db.sqlite');
sqlite.exec(`
    CREATE TABLE IF NOT EXISTS compounds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      strImageSource TEXT,
      srcImageAttribution TEXT,
      dateModified TEXT
    );
  `);
export const db = drizzle(sqlite, { schema, logger: true });