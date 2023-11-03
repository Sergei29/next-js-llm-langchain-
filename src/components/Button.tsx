'use client'

import React from 'react'
import classnames from 'classnames'

interface IProps {
  color?: string
  handleSubmit: (endpoint?: string) => void | Promise<void>
  endpoint?: string
  buttonText: string
  className?: string
}

const Button = ({
  color = '',
  handleSubmit,
  endpoint,
  buttonText,
  className,
}: IProps) => {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    // Add more colors as needed
  }

  const colorClass = colorClasses[color] || 'bg-white hover:bg-white' // Default to blue if color prop not recognized

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (endpoint) {
      handleSubmit(`/${endpoint}`)
    } else {
      handleSubmit()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={classnames(
        `py-2 px-6 mb-4 rounded-full border border-gray-500 shadow hover:shadow-lg ${colorClass}`,
        className,
      )}
    >
      {buttonText}
    </button>
  )
}

export default Button
