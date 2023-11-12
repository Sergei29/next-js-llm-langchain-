'use client'

import React, { useState } from 'react'

import InputForm from '@/components/InputForm'

const ChatStream = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [streamedData, setStreamedData] = useState('')

  const onSubmit = async (formData: FormData) => {
    const prompt = formData.get('prompt')
    if (typeof prompt !== 'string' || !prompt) {
      setError('Form value for prompt is missing.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat-streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
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

        const text = new TextDecoder().decode(value)
        setStreamedData((current) => current + text)
      }

      setIsLoading(false)
    } catch (error) {
      const msg: string =
        error instanceof Error ? error.message : (error as any).ToString()
      setError(msg)
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setStreamedData('')
  }

  return (
    <div className="w-full">
      <InputForm onChatSubmit={onSubmit} handleClear={handleClear} />
      <div className="h-12">
        {error && (
          <p className="text-red-700 font-semibold text-center">{error}</p>
        )}
        {isLoading && (
          <p className="text-green-400-700 font-semibold text-center">
            Loading...
          </p>
        )}
      </div>

      {streamedData && (
        <div>
          <h3 className="text-2xl text-gray-400">AI Assistant:</h3>
          <p className="text-gray-200 rounded bg-gray-700 p-4 mt-4">
            {streamedData}
          </p>
        </div>
      )}
    </div>
  )
}

export default ChatStream
