import type { ZodError } from 'zod/v4'
import path from 'node:path'
import process from 'node:process'
import { config } from 'dotenv'
import { z } from 'zod/v4'

config()
config({
  // eslint-disable-next-line node/no-process-env
  path: path.resolve(process.cwd(), `../.env.${process.env.NODE_ENV}`),
})

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
})

let env: z.infer<typeof EnvSchema>

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env)
  console.log('env', env)
}
catch (e) {
  const error = e as ZodError
  console.error('❌ env错误')
  console.error(JSON.stringify(z.treeifyError(error)))
  process.exit(1)
}

export default env
