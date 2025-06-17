import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schemas/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypassword',
    database: 'tasky',
  },
  casing: 'snake_case',
})
