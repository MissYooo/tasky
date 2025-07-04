import { configureOpenAPI, createApp } from '@/lib/index.ts'
import { auth, task } from '@/modules/index.ts'

const app = createApp()
app.route('/', auth)
app.route('/', task)
configureOpenAPI(app)
export default app
