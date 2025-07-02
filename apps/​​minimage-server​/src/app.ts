import { createApp } from '@/lib/index.ts'
import { mini } from '@/modules/mini/controller.ts'

const app = createApp()
app.route('/', mini)
export default app
