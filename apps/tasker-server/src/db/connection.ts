import { drizzle } from 'drizzle-orm/mysql2'
import env from '@/env.ts'
import * as schema from './schemas/index.ts'

export const db = drizzle({
  connection: {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PWD,
    database: env.MYSQL_DB,
  },
  casing: 'snake_case',
  // mysql2
  mode: 'planetscale',
  schema,
})
