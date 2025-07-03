import type { ApiUploadRes } from './types'
import type { IAxiosRequestConfig } from '@/utils/request'
import httpRequest from '@/utils/request'

export * from './types'

export function apiUpload(data: FormData, onUploadProgress?: IAxiosRequestConfig['onUploadProgress']) {
  return httpRequest<ApiUploadRes>({
    url: '/mini/upload',
    method: 'POST',
    data,
    onUploadProgress,
  })
}
