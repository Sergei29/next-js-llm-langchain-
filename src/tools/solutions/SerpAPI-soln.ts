import { SerpAPI } from 'langchain/tools'

/**
 *
 * WARNING: THIS IS THE SOLUTION! Please try coding before viewing this.
 *
 */

const SerpAPITool = () => {
  const baseUrl = 'http://localhost:3000/agents'
  const serpAPI = new SerpAPI(
    process.env.SERPAPI_API_KEY,
    {
      location: 'Vancouver,British Columbia, Canada',
      hl: 'en',
      gl: 'us',
    },
    baseUrl,
  )
  serpAPI.returnDirect = true

  return serpAPI
}

export default SerpAPITool
