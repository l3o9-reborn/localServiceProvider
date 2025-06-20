import React from 'react'

function SendAMessage() {
  return (
    <div className=" min-h[60vh] pt-10 font-mono bg-gray-700 h-full w-full p-6 flex flex-col items-center justify-center">
      <h1 className="text-heading text-amber-600 ">Send a Message</h1>
      <p className="text-body text-gray-400">
        let us know about your thoughts{' '}
      </p>
      <form className="w-full max-w-[1000px] mx-auto p-6 text-white ">
        <div className="mb-4">
          <label htmlFor="name" className="block text-amber-600 ">
            Name
          </label>
          <input
            type="text"
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
            name="message"
            rows={4}
            required
            className="border-2 border-gray-400 rounded-md w-full py-2 px-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-500 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default SendAMessage
