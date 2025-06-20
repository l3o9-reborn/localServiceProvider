'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function getRandomColor() {
  // pastel random color
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 80%)`
}

function OurGoal() {
  const text =
    'Empower skilled individuals. Simplify service access. Strengthen local communities.'
  const textRef = useRef<HTMLDivElement>(null)
  const [colors, setColors] = useState<string[] | null>(null)

  // Only generate random colors on the client
  useEffect(() => {
    setColors(Array.from({ length: text.length }, getRandomColor))
  }, [text.length])

  useGSAP(() => {
    if (!textRef.current) return
    const chars = textRef.current.querySelectorAll('span')

    gsap.to(chars, {
      scale: 1.05,
      duration: 0.5,
      stagger: 0.05,
      yoyo: true,
      repeat: -1,
      ease: 'back.out(1.7)',
    })
  }, [colors])

  return (
    <div className="min-h-[60vh] font-mono bg-gray-50 h-full w-full p-6 flex flex-col items-center justify-center">
      <div>
        <h1 className="text-heading text-gray-600 flex items-center justify-center text-3xl font-bold my-10">
          <Trophy className="w-10 h-10 text-gray-400 fill-amber-600 inline-block mr-2" />
          <span className="text-amber-600">O</span>ur
          <span className="text-amber-600"> G</span>oal
        </h1>
      </div>
      <div
        ref={textRef}
        className="text-subheading font-mono text-bold capitalize text-center text-lg font-semibold my-5"
        aria-label={text}
      >
        {colors &&
          text.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: colors[i],
                backgroundColor: '#424242',
                borderRadius: '4px',
                //   margin: '0 1px',
                padding: '0 2px',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
      </div>
      <div className="text-amber-600">
        <h2 className="text-subheading text-center py-2 text-amber-600">
          We aim to create a trusted space where{' '}
        </h2>
        <ul className="list-disc list-inside text-lg py-12 mx-auto text-gray-500 font-mono">
          <li>
            Local service providers can showcase their talents, build
            reputation, and earn from their skills.
          </li>
          <li>
            People can quickly find reliable help — from electricians to tutors,
            from cleaners to makeup artists.
          </li>
          <li>
            Every transaction supports your neighborhood’s economy, making the
            community stronger.
          </li>
        </ul>
        <h4 className="text-amber-600">
          Whether you're offering a service or need one, we’re here to bridge
          that gap — locally, affordably, and transparently.
        </h4>
      </div>
    </div>
  )
}

export default OurGoal
