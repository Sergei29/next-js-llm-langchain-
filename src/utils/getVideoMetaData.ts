import { fetchJsonData } from '@/utils/common/fetch'

const getVideoMetaData = async (videoId: string) => {
  // enable api key and setup next.config.js
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.GOOGLE_API_KEY}&part=snippet,contentDetails,statistics,status`

  const [data, error] = await fetchJsonData<
    { items: Record<string, any>[] } & Record<string, any>
  >(url)

  if (error || !data) {
    console.error(`Failed to get metadata: ${error}`)
    return
  }

  // get metadata off the video and return the aggregated value
}

export default getVideoMetaData
