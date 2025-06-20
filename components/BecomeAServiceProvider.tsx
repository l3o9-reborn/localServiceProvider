import React from 'react'
import Lottie from 'lottie-react'
import { serviceProviderSection } from '@/utils/constants'
import providerAnimation from '../public/Animation - 1749647573543.json'

function BecomeAServiceProvider() {
  return (
    <div className="max-w-[1400px] bg-gray-100 min-h-[60vh] h-full w-full max-w-[1400px] mx-auto  px-8">
      <div>
        {/* <h2 className='text-heading text-amber-600 text-center pt-5'>
                Become a Service Provider
            </h2> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between">
        <div className="flex-1 flex flex-col  justify-center  m-auto max-w-[400px] gap-3">
          <p className=" max-w-[600px] text-heading text-amber-600 mt-4">
            Share Your Skills. Earn with Confidence. Help Your Community.
          </p>
          <p className=" text-body text-gray-500">
            At <span className="text-amber-500 underline">Contact Pro</span>, we
            believe everyone has a skill worth sharing. Whether you're a
            professional or just passionate about helping others, this is your
            chance to grow your income and reputation — right in your own
            community.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Lottie
            animationData={providerAnimation}
            loop={true}
            className=" pl-15 w-full h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px]"
          />
        </div>
      </div>
    </div>
  )
}

export default BecomeAServiceProvider
