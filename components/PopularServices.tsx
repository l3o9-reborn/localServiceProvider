import React, { useRef, useEffect } from 'react'
import { popularServicesData } from '@/utils/constants'
import ServiceCard from './ServiceCard'
import gsap from 'gsap'

function isPrime(n: number) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function PopularServices() {
  const H1 = 'Popular Services'
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      const letters = headingRef.current.querySelectorAll('span')
      gsap.fromTo(
        letters,
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        },
      )
    }
  }, [])

  return (
    <div className="bg-amber-200 h-full w-full p-6">
      <div ref={headingRef} className="  text-center mt-10">
        {H1.split('').map((letter, index) => {
          let color = ''
          if (isPrime(index)) {
            color = ' text-amber-500'
          } else if (index % 2 === 0) {
            color = 'text-white'
          } else {
            color = 'text-gray-700'
          }
          return (
            <span
              key={index}
              className={`text-heading inline-block transition-transform duration-300 hover:scale-110 ${color}`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          )
        })}
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {popularServicesData.map((service, index) => (
            <ServiceCard
              key={index}
              logo={service.logo}
              title={service.service}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularServices
