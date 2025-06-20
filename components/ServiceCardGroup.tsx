import React from 'react'
import GroupCard from './GroupCard'
import { serviceCardsData } from '@/utils/constants'

function ServiceCardGroup() {
  return (
    <div className="bg-gray-200 py-10">
      <div className="text-heading text-center py-4 text-gray-400">
        Explore Beyond Limit
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 justify-items-center gap-4 mx-auto">
        {serviceCardsData.map((card, index) => (
          <GroupCard
            key={index}
            heading={card.heading}
            first={card.first}
            second={card.second}
            third={card.third}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceCardGroup
