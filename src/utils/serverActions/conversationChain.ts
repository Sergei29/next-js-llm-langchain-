import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'

import { IServerActionResponse } from '@/types'

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})
const memory = new BufferMemory()
const conversationChain = new ConversationChain({
  llm: model,
  memory,
})

export const handleConversationPrompt = async (
  prompt: unknown,
): Promise<IServerActionResponse<string>> => {
  'use server'

  try {
    const res = await conversationChain.call({
      input: prompt,
    })

    return { data: res.response as string }
  } catch (err) {
    const error: string =
      err instanceof Error ? err.message : (err as any).toString()

    return { error }
  }
}
