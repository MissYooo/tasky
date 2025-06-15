import type { AppOpenAPI } from './create-app.js'
import { Scalar } from '@scalar/hono-api-reference'
import packageJSON from '../../package.json' with { type: 'json' }

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/docjson', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasky API',
    },
  })
  app.get('/doc', Scalar(() => ({
    url: '/docjson',
    theme: 'kepler',
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
  })))
}
