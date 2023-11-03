import React from 'react'

interface IProps {
  featureName: string
}

const InProgressDisplay = ({ featureName }: IProps): JSX.Element => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center underline">
        hi &rsquo;{featureName}&rsquo; feature 👋 !
      </h1>
      <p>status: TODO</p>
    </div>
  )
}

export default InProgressDisplay
