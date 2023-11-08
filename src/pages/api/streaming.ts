import { OpenAI } from 'langchain/llms/openai'
import { NextApiHandler } from 'next'
import SSE from 'express-sse'

const sse = new SSE()

const handlePost: NextApiHandler = (req, res) => {
  try {
    const { input } = req.body

    if (!input) {
      throw new Error('No input')
    }

    // create chat
    const chat = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken: (token, idx) => {
            sse.send(token, 'newToken')
          },
        },
      ],
    })

    // create the prompt
    const prompt = `Make me a short rap about my name and city. Make it funny. Name: ${input}`

    // call frontend to backend
    chat.call(prompt).then(() => {
      // when streaming done:
      sse.send(null, 'end')
    })

    return res.status(200).json({ data: 'OK' })
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString()

    res.statusMessage = msg
    return res.status(500).json({ error: msg })
  }
}

const handleGet: NextApiHandler = async (req, res) => {
  sse.init(req, res)
  return
}

const handleStreaming: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'POST': {
      return handlePost(req, res)
    }

    case 'GET': {
      return handleGet(req, res)
    }

    default: {
      res.status(405).json({ message: 'Method not allowed' })
      return
    }
  }
}

export default handleStreaming
