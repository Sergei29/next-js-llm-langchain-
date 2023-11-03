const extractVideoId = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search)
  return urlParams.get('v')
}

export default extractVideoId
