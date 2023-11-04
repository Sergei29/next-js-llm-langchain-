import { ReactNode } from 'react'

export interface IPageProps<
  P = Record<string, string>,
  Q = Record<string, string>,
> {
  params: P
  searchParams: Q
}

export interface IParentProps {
  children: ReactNode
}

export interface IServerActionResponse<D = unknown> {
  error?: string
  data?: D
}

export interface IChatHistoryItem {
  id: string
  question: string
  answer: string
}
