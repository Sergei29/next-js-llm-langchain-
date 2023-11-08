'use client'

import React, { useState, useEffect } from 'react'

import PromptBoxForm from '@/components/PromptBoxForm'
import ResultStreaming from '@/components/ResultStreaming'
import { fetchJsonData } from '@/utils/common/fetch'
import { IStreamingData } from '@/types'

const streamingUrl = '/api/streaming'

const postToStream = (input: string) =>
  fetchJsonData(streamingUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  })

const processToken = (token: string) =>
  token.replace(/\\n/g, '\n').replace(/\"/g, '').replace(/null/i, '')

const StreamingContent = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<IStreamingData | string | null>(null)
  const [source, setSource] = useState<EventSource | null>(null)

  const postPrompt = async (formData: FormData) => {
    const prompt = formData.get('prompt')
    if (!prompt || typeof prompt !== 'string') return
    setData(null)
    setIsLoading(true)
    setError(null)

    const [_, err] = await postToStream(prompt)
    if (err) {
      setError(err)
      return
    } else {
      const newSource = new EventSource(streamingUrl)
      setSource(newSource)
    }
  }

  useEffect(() => {
    if (!source) return

    const handleToken = (event: MessageEvent<string>) => {
      const token = processToken(event.data)
      setData((current) => (!!current ? current + token : token))
    }
    const handleError = () => {
      setError('Streaming error.')
    }
    const handleClose = () => {
      source.close()
      setIsLoading(false)
    }

    source.addEventListener('newToken', handleToken)
    source.addEventListener('error', handleError)
    source.addEventListener('end', handleClose)

    return () => {
      source.close()
      source.removeEventListener('newToken', handleToken)
      source.removeEventListener('error', handleError)
      source.removeEventListener('end', handleClose)
    }
  }, [source])

  return (
    <>
      <ResultStreaming data={data} />
      <PromptBoxForm
        postPrompt={postPrompt}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}

export default StreamingContent
