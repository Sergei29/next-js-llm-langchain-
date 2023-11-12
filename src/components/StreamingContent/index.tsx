'use client'

import React, { useState } from 'react'

import PromptBoxForm from '@/components/PromptBoxForm'
import ResultStreaming from '@/components/ResultStreaming'
import { IStreamingData } from '@/types'

const StreamingContent = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<IStreamingData | string | null>('')

  const postPrompt = async (formData: FormData) => {
    const prompt = formData.get('prompt')
    if (typeof prompt !== 'string' || !prompt) {
      setError('Form value for prompt is missing.')
      return
    }
    setData('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stream-rap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt }),
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      const reader = res.body?.getReader()

      while (true) {
        const chunk = await reader?.read()
        const done = chunk?.done
        const value = chunk?.value

        if (done) {
          break
        }

        const text = new TextDecoder().decode(value).replace(/null/i, '')
        setData((current) => current + text)
      }

      setIsLoading(false)
    } catch (error) {
      const msg: string =
        error instanceof Error ? error.message : (error as any).ToString()
      setError(msg)
      setIsLoading(false)
    }
  }

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
