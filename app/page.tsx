'use client'

import Hero from '@/components/Hero'
import PopularServices from '@/components/PopularServices'
import ServiceProviderSection from '@/components/ServiceProviderSection'
import OurGoal from '@/components/OurGoal'
import SendAMessage from '@/components/SendAMessage'

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto relative bg-black ">
      <Hero />
      <PopularServices />
      <ServiceProviderSection />
      {/* <OurGoal/> */}
      <SendAMessage />
    </div>
  )
}
