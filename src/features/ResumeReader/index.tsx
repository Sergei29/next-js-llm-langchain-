'use client'

import React, { useState } from 'react'

import ResultWithSources from '@/components/ResultWithSources'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import ButtonContainer from '@/components/ButtonContainer'
import PageHeader from '@/components/PageHeader'
import PromptBox from '@/components/PromptBox'
import Button from '@/components/Button'
import Title from '@/components/Title'

const INITAL_PROMPT = 'Who has experience with Python?'
const ENDPOINT_RESUME_QUERY = '/api/resume-query-metadata'
const ENDPOINT_RESUME_UPLOAD = '/api/resume-upload'
const INITIAL_MESSAGE = {
  text: 'After loading the vector database, ask me anything about your documents! E.g., Has anyone worked at Meta? Where did Joanna Smith go to school? Does Kaito Esquivel have any recommendations?',
  type: 'bot',
}

const ResumeReader = () => {
  const [prompt, setPrompt] = useState(INITAL_PROMPT)
  const [error, setError] = useState<null | string>(null)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }
  const handleSubmitUpload = async () => {
    try {
      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Uploading resumes...',
          type: 'bot',
        },
      ])

      const response = await fetch(ENDPOINT_RESUME_UPLOAD)
      const transcriptRes = await response.json()

      if (!response.ok) {
        throw new Error(transcriptRes.error)
      }

      console.log({ transcriptRes })

      // assuming transcriptRes is an object
      const summariesArray: Record<string, any>[] = JSON.parse(
        transcriptRes.output,
      )

      const newMessages = summariesArray.map((summary) => ({
        text: summary.summary,
        type: 'bot',
      }))

      setMessages((prevMessages) => [...prevMessages, ...newMessages])

      setPrompt('')
    } catch (err) {
      console.error(err)
      setError('Error')
    }
  }

  const handleSubmit = async () => {
    try {
      // Push the user's message into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: 'user', sourceDocuments: null },
      ])

      // set loading message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '...', type: 'bot', sourceDocuments: null },
      ])

      const response = await fetch(`${ENDPOINT_RESUME_QUERY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const searchRes = await response.json()
      console.log({ searchRes })

      // remove loading message
      setMessages((prevMessages) => prevMessages.slice(0, -1))

      // Push the response into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.output,
          type: 'bot',
          sourceDocuments: searchRes.sourceDocuments,
        },
      ])
      setPrompt('')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : (err as any).toString())
    }
  }

  return (
    <>
      <>
        <Title emoji="🤖" headingText="RoboHR" />
        <TwoColumnLayout
          leftChildren={
            <>
              <PageHeader
                heading="Your personal HR assistant"
                boldText="Get information on a whole lot of documents."
                description="This tool uses Document Loaders, OpenAI Embeddings, Summarization Chain, Pinecone, VectorDB QA Chain, Prompt Templates, and the Vector Store Agent."
              />

              <ButtonContainer>
                <Button
                  handleSubmit={handleSubmitUpload}
                  endpoint=""
                  buttonText=" Upload Resumes 📂"
                />
              </ButtonContainer>
            </>
          }
          rightChildren={
            <>
              <ResultWithSources messages={messages} pngFile="robohr" />

              <PromptBox
                prompt={prompt}
                handlePromptChange={handlePromptChange}
                handleSubmit={handleSubmit}
                error={error}
                placeHolderText={'Enter Prompt'}
              />
            </>
          }
        />
      </>
    </>
  )
}

export default ResumeReader
