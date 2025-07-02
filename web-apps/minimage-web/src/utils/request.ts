import type { AxiosInstance } from 'axios'
import axios from 'axios'

export class HttpRequest {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3002/mini',
      timeout: 5000,
    })
  }
}

export default new HttpRequest()
