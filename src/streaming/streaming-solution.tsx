'use client'

import React, { useState, useEffect } from 'react'

import PageHeader from '@/components/PageHeader'
import PromptBox from '@/components/PromptBox'
import ResultStreaming, { IStreamingData } from '@/components/ResultStreaming'
import Title from '@/components/Title'
import TwoColumnLayout from '@/components/TwoColumnLayout'

const processToken = (token: string) => {
  return token.replace(/\\n/g, '\n').replace(/\"/g, '')
}

/**
 *
 * WARNING: THIS IS THE SOLUTION! Please try coding before viewing this.
 *
 */
const Streaming = () => {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState(null)
  const [data, setData] = useState<IStreamingData | string | null>(null)
  const [source, setSource] = useState<Record<string, any> | null>(null)

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      console.log(`sending ${prompt}`)
      await fetch('/api/streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt }),
      })
      // close existing sources
      if (source) {
        source.close()
      }
      // create new eventsource

      const newSource = new EventSource('/api/streaming')

      setSource(newSource)

      newSource.addEventListener('newToken', (event) => {
        const token = processToken(event.data)

        setData((prevData) => prevData + token)
      })

      newSource.addEventListener('end', () => {
        newSource.close()
      })
    } catch (err) {
      console.error(err)
      setError(error)
    }
  }

  // Clean up the EventSource on component unmount
  useEffect(() => {
    // stuff is gonna happen
    return () => {
      if (source) {
        source.close()
      }
    }
  }, [source])
  return (
    <>
      <Title emoji="💭" headingText="Streaming" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Spit a Rap."
              boldText="Nobody likes waiting for APIs to load. Use streaming to improve the user experience of chat bots."
              description="This tutorial uses streaming.  Head over to Module X to get started!"
            />
          </>
        }
        rightChildren={
          <>
            <ResultStreaming data={data} />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={handleSubmit}
              placeHolderText={'Enter your name and city'}
              error={error}
              pngFile="pdf"
            />
          </>
        }
      />
    </>
  )
}

export default Streaming
