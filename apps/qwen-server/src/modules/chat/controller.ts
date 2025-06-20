import { ClientError } from '@orbit/server'
import { createRouter } from '@/lib/creata-app.ts'
import { chatService } from './service.ts'

export const chat = createRouter().basePath('/chat')

chat.get('/', async (c) => {
  const content = c.req.query('content')
  if (content === undefined) {
    throw new ClientError({
      message: '请输入您的问题',
    })
  }
  const rs = chatService.chat(content)
  return new Response(rs, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
})
