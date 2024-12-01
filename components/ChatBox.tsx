'use client'

import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  messages: Message[]
  loading: boolean
}

export default function ChatBox({ messages, loading }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 min-h-[400px] overflow-auto">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-32">
          Start a new conversation...
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gray-100 ml-12'
                  : 'bg-blue-50 mr-12 prose prose-sm max-w-none'
              }`}
            >
              {message.role === 'user' ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
            </div>
          ))}
          {loading && (
            <div className="p-4 rounded-lg bg-blue-50 mr-12">
              Thinking...
            </div>
          )}
        </div>
      )}
    </div>
  )
} 