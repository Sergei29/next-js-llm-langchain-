import { useState, useCallback, useEffect, useRef, RefObject } from 'react'

import { IServerActionResponse, IChatHistoryItem } from '@/types'
import { useLocalStorage } from './useLocalStorage'

interface IHookProps {
  serverAction: (prompt: string) => Promise<IServerActionResponse<string>>
}

export const useChatBox = ({
  serverAction,
}: IHookProps): [
  {
    data: IChatHistoryItem[]
    isLoading: boolean
    error: string | null
    reset: () => void
  },
  (formData: FormData) => Promise<void>,
  RefObject<HTMLFormElement>,
] => {
  const [persistedChatHistory, setPersistedChatHistory] = useLocalStorage<
    IChatHistoryItem[]
  >('chat', [])

  const [chatHistory, setChatHistory] = useState<IChatHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const mountedRef = useRef(true)

  const submitQuestion = useCallback(
    async (formData: FormData) => {
      const question = formData.get('prompt')
      if (typeof question !== 'string' || !question) {
        return setError('prompt field value is missing')
      }
      setIsLoading(true)
      setError(null)

      const { data, error: serverError } = await serverAction(question)

      if (!!serverError) {
        mountedRef.current && setError(serverError || 'No response')
      } else {
        mountedRef.current &&
          setChatHistory((current) => {
            const newChatHistory = [
              ...current,
              { id: Date.now().toString(), question, answer: data as string },
            ]
            setPersistedChatHistory(newChatHistory)
            return newChatHistory
          })

        formRef.current?.reset()
      }
      mountedRef.current && setIsLoading(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [serverAction],
  )

  const reset = useCallback(
    () => {
      setChatHistory([])
      setPersistedChatHistory([])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return [
    { data: persistedChatHistory || [], isLoading, error, reset },
    submitQuestion,
    formRef,
  ]
}
