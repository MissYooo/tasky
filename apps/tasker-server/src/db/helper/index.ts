import { sql } from 'drizzle-orm'
import { datetime } from 'drizzle-orm/mysql-core'

export function timeStamps() {
  return {
    createdAt: datetime({ mode: 'date' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime({ mode: 'date' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  }
}
