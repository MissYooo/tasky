import { serve } from '@hono/node-server'
import app from './app.ts'
import env from './env.ts'

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  () => {
    console.log(`QWen服务在 http://localhost:${env.PORT} 已启动 😊`)
  },
)
