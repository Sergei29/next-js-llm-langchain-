import React from 'react'

interface IProps {
  emoji: React.ReactNode
  headingText: string
}

const Title = ({ emoji, headingText }: IProps) => {
  return (
    <>
      <p className="text-center mb-4">{emoji}</p>
      <p className="text-center mb-8">{headingText.toUpperCase()}</p>
    </>
  )
}

export default Title
