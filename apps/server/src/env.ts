import type { ZodError } from 'zod/v4'
import process from 'node:process'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod/v4'

expand(config())

export const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PROT: z.coerce.number().default(3000),
})

let env: z.infer<typeof EnvSchema>

try {
  env = EnvSchema.parse(process.env)
}
catch (e) {
  const error = e as ZodError
  console.error('❌ env错误')
  console.error(JSON.stringify(z.treeifyError(error)))
  process.exit(1)
}

export default env
