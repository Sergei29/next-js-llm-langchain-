'use client'

import React, { FormEvent, useRef } from 'react'

interface IProps {
  onChatSubmit: (formData: FormData) => void | Promise<void>
  handleClear: () => void
}

const InputForm = ({ onChatSubmit, handleClear }: IProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onChatSubmit(formData)

    formRef.current && formRef.current.reset()
  }

  return (
    <form ref={formRef} onSubmit={handleChatSubmit}>
      <input
        type="text"
        className="py-2 px-4 rounded-md bg-gray-600 text-white w-full"
        placeholder="Enter prompt"
        name="prompt"
        required
      />
      <div className="flex justify-center gap-4 py-4">
        <button
          type="submit"
          className="py-2 px-4 rounded-md text-sm bg-lime-700 text-white hover:opacity-80 transition-opacity"
        >
          Send Chat
        </button>

        <button
          type="button"
          className="py-2 px-4 rounded-md text-sm bg-red-700 text-white hover:opacity-80 transition-opacity"
          onClick={handleClear}
        >
          Clear Chat
        </button>
      </div>
    </form>
  )
}

export default InputForm
