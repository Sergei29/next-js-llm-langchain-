import { NextApiHandler } from 'next'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'

const handleRoute: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(403).end('Method not accepted')
    return
  }
  const { prompt } = req.body
  if (typeof prompt !== 'string' || !prompt) {
    res.status(401).end('Form value for prompt is missing.')
    return
  }

  try {
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken: (token) => {
            // sending the chunks of text to the FE
            res.write(token)
          },
        },
      ],
    })
    await llm.call([new HumanMessage(prompt)])
    // closing the stream when done.
    res.status(204).end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as any).toString()
    res.statusMessage = 'Server-side error occurred.'
    res.status(500).end(msg)
  }
}

export default handleRoute
