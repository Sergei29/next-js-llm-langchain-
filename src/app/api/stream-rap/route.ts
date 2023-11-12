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
  const { input } = await req.json()

  if (!input) {
    return new Response(null, {
      status: 500,
      statusText: 'Body payload missing',
    })
  }
  const prompt = `Make me a short rap about my name and city. Make it funny. Name: ${input}`

  try {
    const readable = await runLLMChain(prompt)

    return new Response(readable)
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString()

    return new Response(null, {
      status: 500,
      statusText: msg,
    })
  }
}
