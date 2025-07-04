import { createRouter } from '@/lib/creata-app.ts'
import { miniService } from './service.ts'

export const mini = createRouter().basePath('/mini')

mini.post('/upload', async (c) => {
  const file = (await c.req.formData()).get('file') as File
  const res = await miniService.upload(file)
  return c.api.success(res)
})

mini.get('/get/:fileId', async (c) => {
  const fileId = c.req.param('fileId')
  const res = await miniService.get(fileId)
  if (res === false) {
    return c.api.error({
      code: 404,
      message: '文件不存在',
    })
  }
  return c.body(res.buffer, {
    headers: {
      'Content-Type': res.mime!,
    },
  })
})
