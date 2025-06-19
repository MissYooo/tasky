import { formatErrorRes } from '../middlewares/resp.ts'

/**
 * 自定义客户端异常类
 */
export class ClientError extends Error {
  errorResponse: ReturnType<typeof formatErrorRes>
  constructor(...options: Parameters<typeof formatErrorRes>) {
    super()
    this.errorResponse = formatErrorRes(...options)
  }
}
