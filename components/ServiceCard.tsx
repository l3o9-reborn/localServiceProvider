import React from 'react'
import { Card, CardTitle, CardContent, CardHeader } from './ui/card'
import { useRouter } from 'next/navigation'

type ServiceCardProps = {
  logo: React.ElementType// Optional logo icon
  title: string
  description: string
}



function ServiceCard(props: ServiceCardProps) {

 const router= useRouter()

 const redirectToGetService=()=>{
  const encodedTitle = encodeURIComponent(title)
  console.log(title)
  router.push(`/getservice?serviceName=${encodedTitle}`)
}

  const { logo: logo, title, description } = props
  return (
    <Card
      onClick={redirectToGetService}
    className=" cursor-pointer bg-gray-700 h-full p-6 hover:scale-105 transition-transform duration-300 shadow-lg">
      <CardHeader className="flex items-center justify-center">
        {props.logo && (
          <div className="bg-amber-400 h-15 w-15 flex items-center justify-center rounded-full   ">
            {React.createElement(logo as React.ElementType)}
          </div>
        )}
      </CardHeader>

      <CardContent className="text-white">
        <CardTitle className=" flex items-center justify-center text-heading mt-2">
          {title}
        </CardTitle>
        <p className="text-center text-gray-400 font-extralight text-xl mt-2 ">
          {description}
        </p>
        {/* <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300'>
                Learn More
            </button> */}
      </CardContent>
    </Card>
  )
}

export default ServiceCard
