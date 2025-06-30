'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { navElementsWithLinks } from '@/utils/constants'

function NavBar() {
  const [slider, setSlider] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useGSAP(() => {
    gsap.from(navRef.current, {
      duration: 1,
      delay: 0.1,
      scrub: true,
      ease: 'power2.out',
      opacity: 0,
    })
  }, [slider])

  const checkLogin = async () => {
    try {
      const res = await fetch('/api/auth/check-auth', { cache: 'no-store' })
      const json = await res.json()
      setIsLoggedIn(json.isLoggedIn)
    } catch (err) {
      console.error('Auth check failed:', err)
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkLogin()

    // Re-check login status when route changes
    const handleRouteChange = () => checkLogin()

    window.addEventListener('focus', handleRouteChange)
    return () => {
      window.removeEventListener('focus', handleRouteChange)
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <div className="sticky z-50 top-0 bg-gray-200 h-[60px] max-w-[1400px] flex items-center justify-between px-4 mx-auto relative">
      <div
        onClick={() => router.push('/')}
        className="logo text-2xl font-bold h-[60px] flex items-center cursor-pointer overflow-hidden"
      >
        <Image src="/L.png" alt="Logo" width={100} height={100} />
      </div>

      {slider && (
        <div
          ref={navRef}
          className="absolute top-15 right-0 w-full h-[95vh] md:w-[300px] md:h-[97vh] bg-gray-800 shadow-[-8px_0_8px_-4px_rgba(255,179,0,.5)] flex flex-col items-center justify-center z-50"
        >
          {navElementsWithLinks.map((element, index) => (
            <span
              key={index}
              className="text-amber-600 my-2 text-xl cursor-pointer"
              onClick={() => {
                router.push(element.link)
                setSlider(false)
              }}
            >
              {element.name}
            </span>
          ))}

          <span className="my-2">
            {isLoggedIn === null ? (
              <span className="text-gray-400">Checking...</span>
            ) : isLoggedIn ? (
              <button
                className="text-red-500 text-xl"
                onClick={() => {
                  handleLogout()
                  setSlider(false)
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-green-600 text-xl"
                onClick={() => {
                  router.push('/login')
                  setSlider(false)
                }}
              >
                Login
              </button>
            )}
          </span>
        </div>
      )}

      <button
        className="cursor-pointer text-amber-600"
        onClick={() => setSlider(!slider)}
      >
        {!slider ? '|||' : 'X'}
      </button>
    </div>
  )
}

export default NavBar
