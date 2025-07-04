import React from 'react'
import Lottie from 'lottie-react'
import { serviceProviderSection } from '@/utils/constants'
import providerAnimation from '../public/Animation - 1749647573543.json'
import { useRouter } from 'next/navigation'

function ServiceProviderSection() {
  const router = useRouter()

  const redirectToCreateProvider = () => {
    router.push('/beaserviceprovider')
  }

  return (
    <div className="max-w-[1400px] bg-gray-100 min-h-[60vh] h-full w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between px-8">
      <div className="flex justify-center items-center">
        <Lottie
          animationData={providerAnimation}
          loop={true}
          className=" pl-15 w-full h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px]"
        />
      </div>

      <div className="flex-1 flex flex-col  justify-center  m-auto max-w-[400px] gap-3">
        <h2 className="text-heading text-amber-600 text-center">
          {serviceProviderSection.title}
        </h2>
        <p className=" max-w-[400px] text-subheading text-gray-500 mt-4 text-center">
          {serviceProviderSection.description}
        </p>
        <button
          onClick={redirectToCreateProvider}
          className="mt-6 text-amber-600 cursor-pointer text-white bg-amber-600 font-light px-6 py-4 border-2 rounded-md text-2xl hover:bg-amber-500 hover:text-white transition-colors duration-300"
        >
          Be a service provider
        </button>
      </div>
    </div>
  )
}

export default ServiceProviderSection
