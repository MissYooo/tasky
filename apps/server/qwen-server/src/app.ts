import { createApp } from '@/lib/index.ts'
import { chat } from '@/modules/chat/controller.ts'

const app = createApp()
app.route('/', chat)
export default app
