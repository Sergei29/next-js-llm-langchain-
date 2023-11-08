import React from 'react'

import { IStreamingData } from '@/types'
interface IProps {
  data?: IStreamingData | string | null
}

const ResultStreaming = ({ data }: IProps) => {
  return (
    <div className="bg-gray-100 p-6 rounded shadow mb-4 min-h-[500px]">
      {/* If data is a string */}
      {typeof data === 'string' && !!data && (
        <pre className="text-black-500 mb-4">{data}</pre>
      )}
      {/* If data is an object */}
      {data && typeof data === 'object' && (
        <p className="text-black-500 mb-4">{data?.output}</p>
      )}

      {/* If data has source documents (e.g. when querying from a VectorDBQAChain and returnSourceDocuments is true) */}
      {data &&
        typeof data === 'object' &&
        data.sourceDocuments &&
        data.sourceDocuments.map((doc, index) => (
          <div key={index} className="bg-grey-100 p-1 rounded shadow mb-2">
            <p>
              Source {index}: {doc.pageContent}
            </p>
            <p className="text-gray-700">From: {doc.metadata.source}</p>
          </div>
        ))}
    </div>
  )
}

export default ResultStreaming
