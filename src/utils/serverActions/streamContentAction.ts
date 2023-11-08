'use server'

import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  streaming: true,
  maxTokens: 25,
})

export const streamContentActon = async (input: string) => {
  try {
    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`
    const streamResponse = await model.stream(prompt)
    return { data: streamResponse }
  } catch (err) {
    const error: string =
      err instanceof Error ? err.message : (err as any).toString()

    return { error }
  }
}
