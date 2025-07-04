import type { AppOpenAPI } from './create-app.ts'

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0',
      title: 'Tasky API',
    },
  })
}
