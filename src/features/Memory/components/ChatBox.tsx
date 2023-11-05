'use client'

import React from 'react'

import PromptBoxForm from '@/components/PromptBoxForm'
import { useChatBox } from '@/hooks/useChatBox'
import { IServerActionResponse } from '@/types'
import ChatHistory from './ChatHistory'

interface IProps {
  serverActionChat: (prompt: string) => Promise<IServerActionResponse<string>>
}

const ChatBox = ({ serverActionChat }: IProps): JSX.Element => {
  const [{ isLoading, error, data }, postPrompt, formRef] = useChatBox({
    serverAction: serverActionChat,
  })

  return (
    <div className="h-full">
      <div className="flex flex-col gap-2 items-center h-[50%] max-h-[400px] overflow-y-scroll">
        <ChatHistory chatList={data} />
        {isLoading && (
          <p className="font-semibold text-center text-green-700">
            processing...
          </p>
        )}
      </div>
      <PromptBoxForm
        ref={formRef}
        isLoading={isLoading}
        error={error}
        postPrompt={postPrompt}
        className="mt-10"
      />
    </div>
  )
}

export default ChatBox
