import { useState, useCallback, useEffect, useRef, RefObject } from 'react'

import { IServerActionResponse, IChatHistoryItem } from '@/types'

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
  },
  (formData: FormData) => Promise<void>,
  RefObject<HTMLFormElement>,
] => {
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
          setChatHistory((current) => [
            ...current,
            { id: Date.now().toString(), question, answer: data as string },
          ])

        formRef.current?.reset()
      }
      mountedRef.current && setIsLoading(false)
    },
    [serverAction],
  )

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return [{ data: chatHistory, isLoading, error }, submitQuestion, formRef]
}
