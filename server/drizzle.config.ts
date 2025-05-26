import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.js",        // path to your schema
  out: "./drizzle",                // where migration files will go
  dialect: "sqlite", 
  dbCredentials: {
    url: "./db.sqlite"             // your SQLite database file
  }
});