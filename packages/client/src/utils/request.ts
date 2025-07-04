import type { ApiJSONResponse } from '@orbit/server'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

/** 扩展AxiosRequestConfig */
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  extractData?: boolean
}

export class AxiosHttpClient {
  instance: AxiosInstance
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
  }

  request
    = (async <T = any>(config: IAxiosRequestConfig) => {
      const response = await this.instance.request<ApiJSONResponse<T>>(config)
      if ([void 0, true].includes(config.extractData)) {
        return response.data.data
      }
      return response
    }) as {
      <T = any>(config: IAxiosRequestConfig & { extractData: false }): Promise<AxiosResponse<T, any>>
      <T = any>(config: IAxiosRequestConfig & { extractData?: true }): Promise<T>
    }
}

const httpRequest = new AxiosHttpClient({
  timeout: 5000,
}).request

export default httpRequest
