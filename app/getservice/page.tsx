'use client'
import React, {  useState } from 'react'
import { Search } from 'lucide-react'
import { ExpandableCardDemo } from '@/components/ExpandableCards'
import { ServiceFinderDetails, CustomerPresentableInterface } from '@/lib/serviceFormInterface'
import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
})

export default function GetServicePage() {
  const [form, setForm] = useState<ServiceFinderDetails>({
    serviceName: '',
    lat: null,
    lng: null,
    distance: 5, // Default distance in KM
  })

  const [data, setData] = useState<CustomerPresentableInterface[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<string | number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (form.serviceName) params.append('serviceName', form.serviceName)
    if (form.lat !== null) params.append('lat', String(form.lat))
    if (form.lng !== null) params.append('lng', String(form.lng))
    if( form.distance) params.append('distance', String(form.distance))

    try {
      const res = await fetch(`/api/service?${params.toString()}`)
      const data = await res.json()
      setData(data)
    } catch (err) {
      console.error('Error fetching services:', err)
    }
  }

  return (
    <div className="w-full min-h-screen p-10">
      <div className="w-full bg-gray-50 rounded-md p-4">
        <form onSubmit={handleSubmit}>
          <input
            value={form.serviceName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, serviceName: e.target.value }))
            }
            placeholder="What Service You Want?"
            type="text"
            className="w-full bg-white rounded-md h-12 px-4 border-2 border-amber-600 text-gray-800 outline-none mb-2"
          />
          <input
            type="number"
            value={form.distance}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, distance: Number(e.target.value) }))
            }
            placeholder="Max Distance (KM)"
            className="w-full bg-white rounded-md h-12 px-4 border-2 border-amber-600 text-gray-800 outline-none mb-2"
          />

          <LocationPicker
            onLocationSelect={(location) => {
              setForm((prev) => ({ ...prev, lat: location.lat, lng: location.lng }))
            }}
            userLocation={
              form.lat !== null && form.lng !== null
                ? { lat: form.lat, lng: form.lng }
                : null
            }
            providers={data.filter(
                (p): p is CustomerPresentableInterface & { lat: number; lng: number } =>
                  typeof p.lat === 'number' && typeof p.lng === 'number'
              )}
            selectedProviderId={selectedProviderId}
            onMarkerClick={(id) => setSelectedProviderId(id)}
          />

          <button
            type="submit"
            className="w-full h-12 bg-amber-600 rounded-md mt-2 flex items-center justify-center hover:bg-amber-500 text-white"
          >
            <Search />
          </button>
        </form>
      </div>

      <div className="mt-6">
        <ExpandableCardDemo
          cards={data}
          activeId={selectedProviderId}
          onCardClick={(id) => setSelectedProviderId(id)}
        />
      </div>
    </div>
  )
}
