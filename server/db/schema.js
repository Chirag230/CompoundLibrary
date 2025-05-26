import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
// import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';

export const compounds = sqliteTable('compounds', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  strImageSource: text('strImageSource'),
  srcImageAttribution: text('srcImageAttribution'),
  dateModified: text('dateModified'),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});