// File: components/LocationPicker.tsx
'use client'
import React, { useEffect, useState } from 'react'
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



const TILE_LAYERS = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
}




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
   distance?: number
}

function LocationEvents({ onSelect }: { onSelect: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng)
    },
  })
  return null
}

// function RecenterMap({ center }: { center: LatLng }) {
//   const map = useMap()
//   useEffect(() => {
//     map.setView(center, map.getZoom(), { animate: true })
//   }, [center, map])
//   return null
// }
function RecenterMap({ center, zoom }: { center: LatLng, zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom, { animate: true })
  }, [center, zoom, map])
  return null
}

function UseCurrentLocationButton({ setPosition }: { setPosition: (latlng: LatLng) => void }) {
  const map = useMap()
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude }
        setPosition(pos)
        map.setView(pos,15)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert('Location permission denied. Please enable location access in your browser settings.')
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert('Location information is unavailable.')
        } else if (error.code === error.TIMEOUT) {
          alert('The request to get your location timed out. Please try again.')
        } else {
          alert('Failed to get current location.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <button
      type='button'
    onClick={handleClick} className="absolute bottom-6 right-4 z-[999] px-4 py-2 bg-white rounded-full shadow hover:scale-125 hover:bg-gray-200 transition-transform duration-300">
      <MapPin className="text-amber-600" />
    </button>
  )
}


function getZoomFromDistance(distanceKm: number): number {
  // This formula approximates the zoom level for a given distance (in km) at a given latitude
  // 40075 is Earth's circumference in km
  const worldMapWidth = 256 // in pixels
  const mapWidth = window.innerWidth/2 || 1024 // fallback for SSR
  // const metersPerPixel = (40075016.686 * Math.cos(latitude * Math.PI / 180)) / Math.pow(2, 0 + 8)
  const zoom = Math.log2((40075 * 1000 * mapWidth) / (distanceKm * 1000 * worldMapWidth))
  return Math.round(zoom -1)
}

export default function LocationPicker({
  onLocationSelect,
  providers = [],
  selectedProviderId,
  onMarkerClick,
  userLocation,
  distance=2
}: LocationPickerProps) {


const [autoLocated, setAutoLocated] = useState(false)
const [layer, setLayer] = useState<'satellite' | 'street'>('satellite')
const zoom = getZoomFromDistance(distance || 2)

  // Auto-locate only once on mount
  useEffect(() => {
    if (!autoLocated && onLocationSelect && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const pos = { lat: coords.latitude, lng: coords.longitude }
          onLocationSelect(pos)
          setAutoLocated(true)
        },
        () => {

          // Optionally handle error
          setAutoLocated(true)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    }
  }, [autoLocated, onLocationSelect])



  return (
    <div className="relative z-1 h-[300px] md:h-[400px] w-full rounded-md overflow-hidden">
      <button
        type="button"
        className="absolute top-4 left-12 z-[1000] px-4 py-2 bg-white text-gray-900 rounded shadow text-sm font-semibold"
        onClick={() => setLayer(layer === 'satellite' ? 'street' : 'satellite')}
      >
        {layer === 'satellite' ? 'Show Street Map' : 'Show Satellite'}
      </button>
      <MapContainer center={[23.8103, 90.4125]} zoom={zoom} className="h-full w-full">
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {/* <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        /> */}
        <TileLayer
          url={TILE_LAYERS[layer].url}
          attribution={TILE_LAYERS[layer].attribution}
        />
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
        {userLocation && (
          <>
            <Marker position={userLocation} icon={CUSTOMER_ICON} />
            <RecenterMap center={userLocation} zoom={zoom}/>
          </>
        )}
        {onLocationSelect && <UseCurrentLocationButton setPosition={onLocationSelect} />}
      </MapContainer>
    </div>
  )
}
