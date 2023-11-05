'use client'

import PromptBoxForm from '@/components/PromptBoxForm'
import { useChatBox } from '@/hooks/useChatBox'
import { IServerActionResponse } from '@/types'
import ChatHistory from './ChatHistory'

interface IProps {
  serverActionChat: (prompt: string) => Promise<IServerActionResponse<string>>
}

const ChatBox = ({ serverActionChat }: IProps): JSX.Element => {
  const [{ isLoading, error, data, reset }, postPrompt, formRef] = useChatBox({
    serverAction: serverActionChat,
  })

  return (
    <div className="h-full">
      <div className="flex flex-col gap-2 items-center h-[50%] max-h-[500px] bg-gray-100 p-4 rounded-3xl shadow-lg mb-8 overflow-y-auto space-y-4">
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
      <button
        onClick={reset}
        className="w-full px-2 py-1 bg-orange-500 hover:bg-orange-600 text-center rounded text-green-900 font-semibold uppercase"
      >
        reset
      </button>
    </div>
  )
}

export default ChatBox
