import { createApp } from '@/lib/index.js'
import { configureOpenAPI } from '@/lib/index.js'
import { auth, task } from '@/modules/index.js'

const app = createApp()
app.route('/', auth)
app.route('/', task)
configureOpenAPI(app)
export default app
