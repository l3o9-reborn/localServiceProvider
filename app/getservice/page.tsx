'use client'
import React, { useEffect, useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { ExpandableCardDemo } from '@/components/ExpandableCards'
// import LocationPicker from '@/components/LocationPicker'
import { ServiceFinderDetails , CustomerPresentableInterface} from '@/lib/serviceFormInterface'

import axios from 'axios'

import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
})

function GetServicePage() {
  const [form, setForm] = useState<ServiceFinderDetails>({
    serviceName: '',
    lat: null,
    lng: null,
  })

  const [data, setData] = useState<CustomerPresentableInterface[]>([])
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log(form);

  // Build query string
  const params = new URLSearchParams();
  if (form.serviceName) params.append('serviceName', form.serviceName);
  if (form.lat !== null) params.append('lat', String(form.lat));
  if (form.lng !== null) params.append('lng', String(form.lng));

  try {
    const res = await fetch(`/api/service?${params.toString()}`);
    const data = await res.json();
    console.log('Service Data:', data);
    setData(data);
    // Do something with the data (e.g., set state to display results)
  } catch (error) {
    console.error('Error submitting service:', error);
  }
};



  return (
    <div className="w-full min-h-[100vh] h-full p-10">
      <div className="w-full h-full  bg-gray-50  rounded-md ">
        <form action="" onSubmit={handleSubmit}>
          <input
            value={form.serviceName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, serviceName: e.target.value }))
            }}
            placeholder="What Service You Want?"
            type="text"
            className="w-full bg-white rounded-md  h-15 px-4 border-2 border-amber-600 flex flex-1 text-gray-800 focus:border-amber-500 outline-none"
          />

          {/* <MapPin  className='text-gray-50 hover:scale-160'/> */}
          <LocationPicker
            onLocationSelect={(location) => {
              setForm((prev) => ({
                ...prev,
                lat: location.lat,
                lng: location.lng,
              }))
            }}
          />
          <button
            type="submit"
            className="w-full h-15 bg-amber-600 rounded-md mt-1  flex items-center justify-center hover:bg-amber-400"
          >
            <Search className="text-gray-50 hover:scale-160" />
          </button>
        </form>
      </div>
      {/* <div className='h-[60vh] w-full bg-white pt-2'>
            {
                Array.from({length:10}).map(_)
            }
         </div> */}
      <ExpandableCardDemo cards={data}/>
    </div>
  )
}

export default GetServicePage
