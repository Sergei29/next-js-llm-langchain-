import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'

const runLLMChain = async (prompt: string) => {
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: async (token) => {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        handleLLMEnd: async (output, runId, parentRunId, tags) => {
          await writer.ready
          await writer.close()
        },
      },
    ],
  })

  llm.call([new HumanMessage(prompt)])

  return stream.readable
}

export const POST = async (req: Request) => {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string') {
    return new Response(null, {
      status: 500,
      statusText: 'Body payload missing',
    })
  }

  try {
    const readable = await runLLMChain(prompt)

    return new Response(readable)
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any).toString()

    return new Response(msg, {
      status: 500,
      statusText: 'Server-side error occurred.',
    })
  }
}
