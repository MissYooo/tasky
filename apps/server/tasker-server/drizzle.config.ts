import { defineConfig } from 'drizzle-kit'
import env from '@/env.ts'

export default defineConfig({
  schema: './src/db/schemas/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PWD,
    database: env.MYSQL_DB,
  },
  casing: 'snake_case',
})
