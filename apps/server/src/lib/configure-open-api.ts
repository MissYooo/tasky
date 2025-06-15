import type { AppOpenAPI } from './create-app.js'
import packageJSON from '../../package.json' with { type: 'json' }

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasky API',
    },
  })
}
