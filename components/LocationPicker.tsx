// File: components/LocationPicker.tsx
'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'lucide-react'

// Marker icons
const PROVIDER_ICON = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const ACTIVE_PROVIDER_ICON = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const CUSTOMER_ICON = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Fix Leaflet Icon Issue
delete ((L.Icon.Default.prototype as unknown) as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: PROVIDER_ICON.options.iconUrl,
  shadowUrl: PROVIDER_ICON.options.shadowUrl,
})

export type LatLng = {
  lat: number
  lng: number
}

interface LocationPickerProps {
  onLocationSelect?: (location: LatLng) => void
  providers?: { id: string | number, lat: number, lng: number, name?: string }[]
  selectedProviderId?: string | number | null
  onMarkerClick?: (id: string | number) => void
  userLocation?: LatLng | null
}

function LocationEvents({ onSelect }: { onSelect: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng)
    },
  })
  return null
}

function UseCurrentLocationButton({ setPosition }: { setPosition: (latlng: LatLng) => void }) {
  const map = useMap()
  const handleClick = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude }
        setPosition(pos)
        map.setView(pos, 15)
      },
      () => alert('Failed to get current location')
    )
  }
  return (
    <button
      type='button'
    onClick={handleClick} className="absolute bottom-10 right-10 z-[999] px-4 py-2 bg-white rounded-full shadow">
      <MapPin className="text-amber-600" />
    </button>
  )
}

export default function LocationPicker({
  onLocationSelect,
  providers = [],
  selectedProviderId,
  onMarkerClick,
  userLocation,
}: LocationPickerProps) {
  return (
    <div className="relative z-1 h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer center={[23.8103, 90.4125]} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {onLocationSelect && <LocationEvents onSelect={onLocationSelect} />}
        {userLocation && <Marker position={userLocation} icon={CUSTOMER_ICON} />}
        {providers.map((p) => (
          <Marker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            icon={p.id === selectedProviderId ? ACTIVE_PROVIDER_ICON : PROVIDER_ICON}
            eventHandlers={{ click: () => onMarkerClick?.(p.id) }}
          />
        ))}
        {onLocationSelect && <UseCurrentLocationButton setPosition={onLocationSelect} />}
      </MapContainer>
    </div>
  )
}
