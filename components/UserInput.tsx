'use client'

import { useState } from 'react'

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function UserInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="relative mb-8">
      <textarea
        className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-16 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors resize-none"
        rows={3}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button 
        className={`absolute right-3 bottom-3 p-2 rounded-lg bg-gray-800 text-white transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
        }`}
        onClick={handleSubmit}
        disabled={disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  )
} 