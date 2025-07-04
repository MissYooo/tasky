import type { ZodError } from 'zod/v4'
import process from 'node:process'
import { config } from 'dotenv'
import { z } from 'zod/v4'

config({
  // eslint-disable-next-line node/no-process-env
  path: ['.env', `.env.${process.env.NODE_ENV}`],
  override: true,
})

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  API_KEY: z.string(),
  JWT_PrivateKey: z.string(),
})

// eslint-disable-next-line import/no-mutable-exports
let env: z.infer<typeof EnvSchema>

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env)
}
catch (e) {
  const error = e as ZodError
  console.error('❌ env错误')
  console.error(JSON.stringify(z.treeifyError(error)))
  process.exit(1)
}

export default env
