'use client'

import { IChatHistoryItem, IParentProps } from '@/types'

const Question = ({ children }: IParentProps) => (
  <p className="mb-1 px-2 py-1 rounded bg-yellow-200 border-1 border-yellow-500 text-sm">
    <span className="font-bold">Q: </span>
    <span>{children}</span>
  </p>
)

const Answer = ({ children }: IParentProps) => (
  <p className="ml-4 px-2 py-1 rounded bg-pink-200 border-1 border-pink-500 text-sm">
    <span className="font-bold">AI: </span>
    <span>{children}</span>
  </p>
)

interface IProps {
  chatList: IChatHistoryItem[]
}

const ChatHistory = ({ chatList }: IProps): JSX.Element => (
  <>
    {chatList.length === 0 && (
      <p className="mb-1 px-2 py-1 rounded bg-yellow-200 border-1 border-yellow-500 text-sm w-full">
        No chat history yet
      </p>
    )}
    {chatList.map(({ id, question, answer }) => {
      return (
        <div key={id}>
          <Question>{question}</Question>
          <Answer>{answer}</Answer>
        </div>
      )
    })}
  </>
)

export default ChatHistory
