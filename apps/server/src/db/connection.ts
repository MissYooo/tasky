import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schemas/index.ts'

export const db = drizzle({
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypassword',
    database: 'tasky',
  },
  casing: 'snake_case',
  // mysql2
  mode: 'planetscale',
  schema,
})
