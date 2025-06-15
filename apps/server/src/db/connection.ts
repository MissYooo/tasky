import { drizzle } from 'drizzle-orm/mysql2'

export const db = drizzle({
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypassword',
    database: 'database',
  },
})
