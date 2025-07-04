import OpenAI from 'openai'
import env from '@/env.ts'

const openai = new OpenAI(
  {
    apiKey: env.API_KEY,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  },
)

export default openai
