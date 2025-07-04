'use client'
import React, {  useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { ExpandableCardDemo } from '@/components/ExpandableCards'
import { ServiceFinderDetails, CustomerPresentableInterface } from '@/lib/serviceFormInterface'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
})

export default function GetServicePage() {

  const searchParams= useSearchParams()

  const [form, setForm] = useState<ServiceFinderDetails>({
    serviceName: '',
    lat: null,
    lng: null,
    distance: '', // Default distance in KM
  })
  const [loading, setLoading]= useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [data, setData] = useState<CustomerPresentableInterface[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<string | number | null>(null)

  useEffect(() => {
  const serviceNameParam = searchParams.get('serviceName')
  if (serviceNameParam) {
    setForm((prev) => ({ ...prev, serviceName: serviceNameParam }))
  }
  }, [searchParams])





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setLoading(true)
    setHasSearched(true)
    const params = new URLSearchParams()
    if (form.serviceName) params.append('serviceName', form.serviceName)
    if (form.lat !== null) params.append('lat', String(form.lat))
    if (form.lng !== null) params.append('lng', String(form.lng))
    if( form.distance) params.append('distance', String(form.distance))

    try {
      const res = await fetch(`/api/service?${params.toString()}`)
      const data = await res.json()
      console.log('Fetched services:', data)
      setData(data)
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen md:p-10">
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
            distance={Number(form.distance) || 2}
            providers={data.filter(
                (p): p is CustomerPresentableInterface & { lat: number; lng: number } =>
                  typeof p.lat === 'number' && typeof p.lng === 'number'
              )}
            selectedProviderId={selectedProviderId}
            onMarkerClick={(id) => setSelectedProviderId(id)}
          />

        <button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer h-12 bg-amber-600 rounded-md mt-2 flex items-center justify-center hover:bg-amber-500 text-white"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Searching...
            </>
          ) : (
            <Search />
          )}
        </button>
        </form>
      </div>

      <div className="mt-6">
       <div className="mt-6">
          {hasSearched && data.length === 0 && !loading ? (
            <div className="text-center text-gray-600 text-xl py-10">
              🚫 No service found
            </div>
          ) : (
            <ExpandableCardDemo
              cards={data}
              activeId={selectedProviderId}
              onCardClick={(id) => setSelectedProviderId(id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
