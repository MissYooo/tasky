import { serve } from '@hono/node-server'
import app from './app.js'
import env from './env.js'

serve(
  {
    fetch: app.fetch,
    port: env.PROT,
  },
  () => {
    console.log(`tasky服务在 http://localhost:${env.PROT} 已启动 😊`)
  },
)
