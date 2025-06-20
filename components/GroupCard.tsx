import React from 'react'
interface cardProps {
  heading: string
  first: string
  second: string
  third: string
}

function GroupCard(props: cardProps) {
  return (
    <div>
      <h1 className="text-subheading text-amber-500  text-center rounded-md">
        {props.heading}
      </h1>
      <div className=" relative  min-w-[400px]  w-full bg-white rounded-md shadow-2xl overflow-hidden">
        <div className="relative ">
          <div className=" w-full bg-amber-600 pb-5 [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)] relative  left-10 ">
            <span className="text-4xl text-white relative left-5">01</span>
            <div className=" max-w-[450px] block text-body text-gray-100 px-15">
              {props.first}
            </div>
          </div>
          <div className=" w-full bg-gray-800 pb-5 [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)]  relative  left-5 ">
            <span className="text-4xl text-white relative left-5">02</span>
            <div className="max-w-[450px] block text-body text-gray-100 px-15">
              {props.second}
            </div>
          </div>
          <div className=" w-full bg-amber-400 pb-5 [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)] relative  left-0">
            <span className="text-4xl text-white relative left-5">03</span>
            <div className="max-w-[450px] block text-body text-gray-100 px-15">
              {props.third}
            </div>
          </div>
          {/* <div className= 'z-10  absolute top-0  h-[100%]  w-[100%] bg-gray-400 [clip-path:polygon(20%_0,100%_0,100%_100%,10%_100%)] shadow-2xs '>
                hay
                </div> */}
        </div>
      </div>
    </div>
  )
}

export default GroupCard
