'use client'

import { forwardRef, FormEvent } from 'react'
import classnames from 'classnames'

import { sourceCodePro } from '@/styles/fonts'

interface IProps {
  label?: string
  placeholder?: string
  postPrompt: (params: FormData) => Promise<void>
  isLoading: boolean
  error: null | string
  buttonText?: string
  className?: string
}
export type Ref = HTMLFormElement

const PromptBoxForm = forwardRef<Ref, IProps>(
  (
    {
      isLoading,
      error,
      postPrompt,
      label,
      placeholder = 'Enter your prompt',
      buttonText = 'Enter',
      className,
    },
    formRef,
  ): JSX.Element => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      postPrompt(formData)
    }

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={classnames('flex items-center mb-4', className)}
      >
        {label && (
          <label htmlFor="prompt" className="mr-4">
            {label}
          </label>
        )}

        <input
          type="text"
          name="prompt"
          id="prompt"
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full mr-4 py-2 px-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded shadow"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`py-2 px-6 bg-white shadow text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200 h-10 uppercase ${sourceCodePro.className}`}
        >
          {buttonText}
        </button>
        <p className={`text-red-500 ${error ? 'block' : 'hidden'}`}>{error}</p>
      </form>
    )
  },
)

PromptBoxForm.displayName = 'PromptBoxForm'

export default PromptBoxForm
