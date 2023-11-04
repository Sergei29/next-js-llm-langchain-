'use client'

import React, { useEffect } from 'react'

import PromptBoxForm from '@/components/PromptBoxForm'
import { useChatBox } from '@/hooks/useChatBox'
import { IServerActionResponse } from '@/types'

interface IProps {
  serverActionChat: (prompt: string) => Promise<IServerActionResponse<string>>
}

const ChatBox = ({ serverActionChat }: IProps): JSX.Element => {
  const [state, postPrompt, formRef] = useChatBox({
    serverAction: serverActionChat,
  })
  const { isLoading, error, data } = state

  useEffect(() => {
    if (!state.data) {
      return
    }
  }, [state.data])

  return (
    <div className="h-full">
      <div className="flex flex-col gap-2 items-center h-[50%] max-h-[400px] overflow-y-scroll">
        {data.length === 0 && (
          <p className="mb-1 px-2 py-1 rounded bg-yellow-200 border-1 border-yellow-500 text-sm w-full">
            No chat history yet
          </p>
        )}
        {data.map(({ id, question, answer }) => {
          return (
            <div key={id}>
              <p className="mb-1 px-2 py-1 rounded bg-yellow-200 border-1 border-yellow-500 text-sm">
                <span>Q: </span>
                <span>{question}</span>
              </p>
              <p className="px-2 py-1 rounded bg-pink-200 border-1 border-pink-500 text-sm">
                <span>AI: </span>
                <span>{answer}</span>
              </p>
            </div>
          )
        })}
      </div>
      <div className="mt-10">
        <PromptBoxForm
          ref={formRef}
          isLoading={isLoading}
          error={error}
          postPrompt={postPrompt}
        />
      </div>
    </div>
  )
}

export default ChatBox
