'use client'

import React, { useState } from 'react'

import InputForm from '@/components/InputForm'

const LOREM_IPSUM =
  'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'

interface IProps {}

const ChatStream = ({}: IProps): JSX.Element => {
  const [error, setError] = useState<null | string>(null)
  const [streamedData, setStreamedData] = useState(LOREM_IPSUM)

  const onSubmit = async (formData: FormData) => {
    setError(null)
    try {
      const prompt = formData.get('prompt')

      if (typeof prompt !== 'string' || !prompt) {
        throw new Error('Form value for prompt is missing.')
      }

      console.log('prompt :>> ', prompt)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Chat streaming error'
      setError(msg)
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
