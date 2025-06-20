import openai from '@/lib/openai.ts'

export const chatService = {
  chat: (content: string) => {
    const rs = new ReadableStream<string>({
      start: async (controller) => {
        const completion = await openai.chat.completions.create({
          model: 'qwen-plus',
          messages: [
            { role: 'user', content },
          ],
          stream: true,
          stream_options: {
            include_usage: true,
          },
        })
        for await (const chunk of completion) {
          if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
            console.log(chunk.choices[0].delta.content)
            controller.enqueue(`data: ${chunk.choices[0].delta.content}\n\n`)
          }
        }
        controller.enqueue(`data: [DONE]\n\n`)
        controller.close()
      },
    })
    return rs
  },
}
