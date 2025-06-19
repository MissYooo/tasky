import type { AppOpenAPI } from './create-app.ts'
import { swaggerUI } from '@hono/swagger-ui'
import packageJSON from '../../package.json' with { type: 'json' }

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/docjson', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasky API',
    },
  })
  app.get('/doc', swaggerUI({ url: '/docjson' }))
}
