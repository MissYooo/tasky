import { createRouter } from '@/lib/creata-app.ts'
import { miniService } from './service.ts'

export const mini = createRouter().basePath('/mini')

mini.post('/', async (c) => {
  const file = (await c.req.formData()).get('file') as File
  const res = await miniService.mini(file)
  return c.api.success(res)
})
