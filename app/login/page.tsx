'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function sendLink() {
    const res = await fetch('/api/auth/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    setMessage(data.message || data.error)
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
        <div className="p-10  shadow-2xl shadow-amber-500 rounded-md">
            <h1 className="text-2xl text-gray-600 md:text-4xl font-bold mb-4">Login in to <span className='text-amber-500'>Contact Pro</span></h1>
            <input
                type="email"
                placeholder="Enter your email"
                className="border-2 p-4 rounded-md border-amber-400 w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                onClick={sendLink}
                className="bg-amber-600 text-white px-4 md:px-10 py-2 md:py-4  rounded"
            >
                Send Magic Link
            </button>
            <p className="mt-4 text-sm text-emerald-600">{message}</p>
        </div>
    </div>
  )
}
