import { serve } from '@hono/node-server'
import app from './app.js'
import env from './env.js'

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  () => {
    console.log(`tasky服务在 http://localhost:${env.PORT} 已启动 😊`)
  },
)
