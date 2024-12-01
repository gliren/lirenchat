'use client'

import ChatBox from '../components/ChatBox'
import UserInput from '../components/UserInput'
import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return

    // Add user message to the conversation
    const newMessages: Message[] = [...messages, { role: 'user' as const, content: userInput }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-1a9fb126499b4780a82f00d6b4cbaad1'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: newMessages,
          temperature: 0.7
        })
      })

      const data = await response.json()
      
      // Add AI reply to the conversation
      if (data.choices && data.choices[0]?.message) {
        setMessages(prev => [...prev, {
          role: 'assistant' as const,
          content: data.choices[0].message.content
        }])
      } else {
        console.error('Unexpected API response:', data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="pt-16 pb-12 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          LirenChat
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Explore the Possibilities of AI Conversation
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-4">
        <ChatBox messages={messages} loading={loading} />
        <UserInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </main>
  )
} 