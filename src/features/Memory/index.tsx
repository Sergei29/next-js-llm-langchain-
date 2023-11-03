// start here
import React from 'react'

interface IProps {
  [x: string]: any
}

const Memory = ({}: IProps): JSX.Element => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center underline">
        hi Memory feature 👋 !
      </h1>
      <p>status: TODO</p>
    </div>
  )
}

export default Memory
