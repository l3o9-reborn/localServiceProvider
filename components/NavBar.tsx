'use client'
import React, { useRef, useState } from 'react'
import { navElements } from '@/utils/constants'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

function NavBar() {
  const [slider, setSlider] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  useGSAP(() => {
    gsap.from(navRef.current, {
      duration: 1,
      delay: 0.1,
      scrub: true,
      ease: 'power2.out',
      opacity: 0,
    })
  }, [slider])

  return (
    <div className=" bg-gray-200 h-[60px] flex items-center justify-between px-4 mx-auto relative">
      <div
        onClick={() => router.push('/')}
        className="logo text-2xl font-bold "
      >
        <Image src="/L.png" alt="Logo" width={100} height={100}></Image>
      </div>
      <div className="hidden">
        {navElements.map((element, index) => (
          <span
            key={index}
            className="text-amber-600 mx-2 cursor-pointer hover:underline"
          >
            {element}
          </span>
        ))}
      </div>
      {slider && (
        <div
          ref={navRef}
          className="absolute  top-15 right-0 w-[300px] h-[65vh] bg-gray-800 opacity-80 flex flex-col items-center justify-center z-50"
        >
          {navElements.map((element, index) => (
            <span
              key={index}
              className="text-amber-600 my-2 text-xl cursor-pointer hover:underline"
            >
              {element}
            </span>
          ))}
        </div>
      )}
      <div>
        <button
          className="text-amber-600 font-bold "
          onClick={() => setSlider(!slider)}
        >
          {!slider ? '|||' : 'X'}
        </button>
      </div>
    </div>
  )
}

export default NavBar
