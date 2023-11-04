import { useState, useCallback, useEffect, useRef, RefObject } from 'react'

import { IServerActionResponse } from '@/types'

export interface IState extends IServerActionResponse {
  pending?: boolean
}

interface IHookProps<Params = Record<string, any>> {
  serverAction: (objParams: Params) => Promise<IServerActionResponse>
  initialState?: IState
}

export const useFormState = <Params = Record<string, any>>({
  serverAction,
  initialState = {},
}: IHookProps<Params>): [
  IState,
  (params: Params) => Promise<void>,
  RefObject<HTMLFormElement>,
] => {
  const [state, setState] = useState<IState>(() => initialState)
  const formRef = useRef<HTMLFormElement>(null)

  const { data, error, pending } = state

  const handleAction = useCallback(
    async (params: Params) => {
      setState({ pending: true })
      const response = await serverAction(params)
      setState(response)
      if (response.data) {
        formRef.current?.reset()
      }
    },
    [serverAction],
  )

  useEffect(() => {
    if (!data && !error && !pending) {
      return
    }

    let isMounted = true

    setTimeout(() => {
      isMounted && setState({})
    }, 3000)

    return () => {
      isMounted = false
    }
  }, [data, error, pending])

  return [state, handleAction, formRef]
}
