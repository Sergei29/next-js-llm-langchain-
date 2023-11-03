import { WebBrowser } from 'langchain/tools/webbrowser'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Tool } from 'langchain/tools'

const WebBrowserTool = () => {
  // do stuff!
  return {
    returnDirect: true,
  } as Tool
}

export default WebBrowserTool
