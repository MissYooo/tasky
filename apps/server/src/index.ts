import { serve } from '@hono/node-server'
import app from './app.js'

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log('tasky服务在 http://localhost:3000 已启动 😊')
  },
)
