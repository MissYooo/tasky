import { AxiosHttpClient } from '@orbit/client'

export const httpClient = new AxiosHttpClient({
  timeout: 5000,
})

const httpRequest = httpClient.request

export default httpRequest
