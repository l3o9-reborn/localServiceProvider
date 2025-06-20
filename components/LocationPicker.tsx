'use client'
import React, { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix marker icon issue for Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Types
type LatLng = {
  lat: number
  lng: number
}

type Props = {
  onLocationSelect?: (location: LatLng) => void
}

type LocationMarkerProps = {
  position: LatLng | null
}

type LocationEventsProps = {
  onSelect: (latlng: LatLng) => void
}

type UseCurrentLocationButtonProps = {
  setPosition: (pos: LatLng) => void
}

// Marker Component
function LocationMarker({ position }: LocationMarkerProps) {
  return position ? <Marker position={position} /> : null
}

// Click Events on Map
function LocationEvents({ onSelect }: LocationEventsProps) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng)
    },
  })
  return null
}

// Button to Get Current Location
function UseCurrentLocationButton({
  setPosition,
}: UseCurrentLocationButtonProps) {
  const map = useMap()

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords
        const newLatLng = { lat: latitude, lng: longitude }
        setPosition(newLatLng)
        map.setView(newLatLng, 15)
      },
      (err) => {
        alert('Failed to get location.')
        console.error(err)
      },
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute z-[999] bottom-10 right-10 px-4 py-2 text-sm bg-gray-800 border rounded-full shadow-xl hover:bg-gray-100"
    >
      <MapPin className="text-amber-600" />
    </button>
  )
}

// Main Exported Component
export default function LocationPicker({ onLocationSelect }: Props) {
  const [position, setPosition] = useState<LatLng | null>(null)

  useEffect(() => {
    if (position && onLocationSelect) {
      onLocationSelect(position)
    }
  }, [position])

  //here dependencies were postion and onPositionSelect

  return (
    <div className="relative h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={13}
        className="h-full w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationEvents onSelect={setPosition} />
        <LocationMarker position={position} />
        <UseCurrentLocationButton setPosition={setPosition} />
      </MapContainer>
    </div>
  )
}
