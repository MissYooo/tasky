import type { AppOpenAPI } from './create-app.ts'
import { Scalar } from '@scalar/hono-api-reference'

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0',
      title: 'Tasky API',
    },
  })
  app.get('/scalar', Scalar({ url: '/doc' }))
}
