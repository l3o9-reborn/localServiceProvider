'use client'
import React , {useState} from 'react'
import { ContactWithEmailInterface } from '@/lib/serviceFormInterface'

function SendAMessage() {

const [form, setForm] = useState<ContactWithEmailInterface>({
  name: '',
  email: '',
  message: '',
})
const [loading, setLoading] = useState(false)


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }))
}


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch('/api/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      alert(data.success || 'Message sent successfully.');
      setForm({ name: '', email: '', message: '' }); // Reset form
    } else {
      alert(data.error || 'Failed to send message.');
    }
  };


  return (
    <div className=" min-h[60vh] pt-10 font-mono bg-gray-700 h-full w-full p-6 flex flex-col items-center justify-center">
      <h1 className="text-heading text-amber-600 ">Send a Message</h1>
      <p className="text-body text-gray-400">
        let us know about your thoughts{' '}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-[1000px] mx-auto p-6 text-white ">
        <div className="mb-4">
          <label htmlFor="name" className="block text-amber-600 ">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            id="name"
            name="name"
            required
            className="border-2 border-gray-400 rounded-md w-full py-2 px-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"

            className="text-amber-600 block text-sm font-medium "
          >
            Email
          </label>
          <input
            type="email"
            value= {form.email}
            onChange={handleChange}
            id="email"
            name="email"
            required
            className="border-2 border-gray-400 rounded-md w-full py-2 px-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="text-amber-600 block text-sm font-medium "
          >
            Message
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={handleChange}
            name="message"
            rows={4}
            required
            className="border-2 border-gray-400 rounded-md w-full py-2 px-2"
          ></textarea>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition duration-200"
        >
         { loading? "Sending ..." : "Send Message"}
        </button>
        
      </form>
    </div>
  )
}

export default SendAMessage
