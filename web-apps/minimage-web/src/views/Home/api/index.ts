import type { ApiUploadRes } from './types'
import httpRequest from '@/utils/request'

export * from './types'

export function apiUpload(data: FormData) {
  return httpRequest<ApiUploadRes>({
    url: '/mini/upload',
    method: 'POST',
    data,
  })
}
