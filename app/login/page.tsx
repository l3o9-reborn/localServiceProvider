'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendLink() {
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(data.error || 'Please enter a valid email address.')
        }
        if (res.status === 404) {
          throw new Error('No account found with this email address.')
        }
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a few minutes and try again.')
        }
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setMessage('✅ A magic login link has been sent to your email. Please check your inbox (and spam folder).')
    } catch (error) {
      const err = error as Error
      setMessage(`❌ ${err.message || 'Failed to send magic link.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 shadow-2xl shadow-amber-500 rounded-md bg-white">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-700">
          Login to <span className="text-amber-500">Contact Pro</span>
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="border-2 border-amber-400 p-4 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading || !email}
          onClick={sendLink}
          className={`w-full  text-white px-4 py-3 rounded-md transition duration-200 ${
            loading || !email
              ? 'bg-amber-300 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-500 cursor-pointer'
          }`}
        >
          {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
        </button>

        {message && (
          <p className={`mt-4 text-sm ${message.startsWith('✅') ? 'text-emerald-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
