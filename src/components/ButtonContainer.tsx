import React from 'react'

import { IParentProps } from '@/types'

const ButtonContainer = ({ children }: IParentProps) => {
  return <div className="flex items-center mb-10 gap-10">{children}</div>
}

export default ButtonContainer
