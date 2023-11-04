import React from 'react'

import { IParentProps } from '@/types'
interface IProps {
  leftChildren: React.ReactNode
  rightChildren: React.ReactNode
}

const TwoColumnLayout = ({ leftChildren, rightChildren }: IProps) => (
  <div className="flex flex-col justify-between  md:flex-row md:justify-between">
    {/* Description */}
    <div className="md:w-2/5 w-full">{leftChildren}</div>
    {/* Chat */}
    <div className="md:w-2/5 w-full min-h-screen">{rightChildren}</div>
  </div>
)

/**
 * @description Page description content
 */
const Left = ({ children }: IParentProps) => {
  return <div className="md:w-2/5 w-full">{children}</div>
}

/**
 * @description Chat data display
 */
const Right = ({ children }: IParentProps) => {
  return <div className="md:w-2/5 w-full min-h-screen">{children}</div>
}

const PageLayout = ({ children }: IParentProps) => {
  return (
    <div className="flex flex-col justify-between  md:flex-row md:justify-between">
      {children}
    </div>
  )
}

PageLayout.Right = Right
PageLayout.Left = Left

export { PageLayout }

export default TwoColumnLayout
