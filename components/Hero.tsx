import React from 'react'
import Lottie from 'lottie-react'
import heroAnimation from '../public/Animation - 1749203754304.json'
import { useRouter } from 'next/navigation'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Hero() {
  const heroTextRef = React.useRef<HTMLDivElement>(null)
  const heroAnimationRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  useGSAP(() => {
    if (!heroTextRef.current) return
    const q = gsap.utils.selector(heroTextRef)

    const tl = gsap.timeline({ defaults: { duration: 1 } })

    tl.from(q('.hero-stagger'), {
      scale: 0.5,
      opacity: 0,
      ease: 'power2.out',
      stagger: 0.2,
    }).from(
      heroAnimationRef.current,
      {
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)',
      },
      '-=0.5',
    )
  }, [heroTextRef, heroAnimationRef])

  const GetIntoServiePage = () => router.push('/getservice')

  return (
    <div className="bg-gray-50  h-full  min-h-[60vh] w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between px-8">
      <div
        ref={heroTextRef}
        className="flex-1 flex text-4xl font-bold flex-col gap-5 max-w-[500px]"
      >
        <div className="hero-stagger mt-10">
          <h1 className="sm:text-[12px] text-heading max-w-[700px] text-amber-600 ">
            Find Trusted Local Experts. Fast.
          </h1>
        </div>
        <div className="hero-stagger">
          <h3 className="text-subheading text-gray-500 max-w-[700px] mt-4">
            Browse skilled professionals near you and call them directly. No
            middlemen, no waiting — just real help, on your terms.
          </h3>
        </div>
        <div className="hero-stagger">
          <button
            onClick={GetIntoServiePage}
            className="mt-6 text-white cursor-pointer bg-amber-600 font-light px-6 py-4 border-2 rounded-md text-2xl hover:bg-amber-400 hover:text-white transition-colors duration-300"
          >
            Get Service Near You
          </button>
        </div>
      </div>
      <div
        ref={heroAnimationRef}
        className="flex-1 flex items-center justify-center"
      >
        <Lottie
          animationData={heroAnimation}
          loop={true}
          className="w-full h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px]"
        />
      </div>
    </div>
  )
}

export default Hero
