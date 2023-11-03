import { SerpAPI } from 'langchain/tools'
import { Tool } from 'langchain/tools'

const SerpAPITool = () => {
  return { returnDirect: true } as Tool
}

export default SerpAPITool
