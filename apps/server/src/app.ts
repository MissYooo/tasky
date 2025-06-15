import { OpenAPIHono } from '@hono/zod-openapi'
import {
  jwtMiddleware,
  notFoundMiddleware,
  respMiddleware,
} from '@/middlewares/index.js'
import { auth, task } from '@/modules/index.js'

const app = new OpenAPIHono({
  strict: false,
})

app.use('/*', respMiddleware)
app.route('/', auth)

app.use('/*', jwtMiddleware)
app.route('/', task)

app.notFound(notFoundMiddleware)
app.onError((err, c) => {
  return c.api.error(err.message)
})

export default app
