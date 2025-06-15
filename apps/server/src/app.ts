import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jwtMiddleware, respMiddleware } from '@/middlewares/index.js'
import { auth, task } from '@/modules/index.js'

const app = new Hono({
  strict: false,
})

app.use('/*', respMiddleware)
app.route('/', auth)

app.use('/*', jwtMiddleware)
app.route('/', task)

app.onError((err, c) => {
  return c.api.error(err.message)
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  () => {
    console.log('😊 芜湖~ 起飞~', '3000端口已启动!')
  },
)
