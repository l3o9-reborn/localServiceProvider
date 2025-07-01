export const config = {
  runtime: 'nodejs',
}


import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ServiceFormInterface } from '@/lib/serviceFormInterface'
import { cookies } from 'next/headers'
import { verifyJWT } from '@/lib/jwt' 
import fuzzysort from 'fuzzysort'
import stringSimilarity from 'string-similarity'



export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    // Decode the JWT to get the email
    const payload = verifyJWT(token)
    if (!payload || typeof payload.email !== 'string') {
      return NextResponse.json({ message: 'Invalid token payload' }, { status: 401 })
    }
    const email = payload.email


    const formData = await request.formData()
    const serviceForm: ServiceFormInterface = {
      name: formData.get('name') as string,
      number: formData.get('number') as string,
      services: (formData.get('services') as string)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      skills: (formData.get('skills') as string)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      bio: formData.get('bio') as string,
      lat: parseFloat(formData.get('lat') as string) || null,
      lng: parseFloat(formData.get('lng') as string) || null,
      image: formData.get('image') as  string, // image can be a File or a string (path)
      email,
    }
    

    console.log('Service Form Data:', serviceForm)

    // Insert into database
    const { data, error } = await supabase
      .from('service_form')
      .insert([serviceForm])
    if (error) throw error

    return NextResponse.json({
      message: 'Service submitted successfully',
      data,
    })
  } catch (error) {

    const err = error as Error
    // 
    console.error('Error submitting service:', err)
    return NextResponse.json(
      { message: 'Error submitting service', error: err.message },
      { status: 500 },
    )
  }
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const serviceName = searchParams.get('serviceName')?.toLowerCase() || ''
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const distance = parseFloat(searchParams.get('distance') || '')
  const radiusKm = distance || 2 // Default radius: 2km

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  try {
    const { data, error } = await supabase.from('service_form').select('*')
    if (error) throw error

    const filtered = data
      .map((service: ServiceFormInterface) => {
        if (
          !Array.isArray(service.services) ||
          !Array.isArray(service.skills) ||
          typeof service.lat !== 'number' ||
          typeof service.lng !== 'number' ||
          isNaN(lat) ||
          isNaN(lng)
        ) {
          return null
        }

        const allTerms = [
          ...service.services.map((s) => s.toLowerCase()),
          ...service.skills.map((s) => s.toLowerCase()),
        ]

        // --- Try fuzzysort ---
        const fuzzyMatches = fuzzysort.go(serviceName, allTerms, { threshold: -1000 })

        // --- Fallback: Try string-similarity if no fuzzysort match ---
        let similarMatch = false
        if (!fuzzyMatches.length) {
          const simResult = stringSimilarity.findBestMatch(serviceName, allTerms)
          if (simResult.bestMatch.rating >= 0.5) {
            similarMatch = true
          }
        }

        // If neither match succeeded, discard this entry
        if (!fuzzyMatches.length && !similarMatch) return null

        // --- Distance filtering ---
        const calculatedDistance = getDistanceFromLatLonInKm(lat, lng, service.lat, service.lng)
        if (calculatedDistance > radiusKm) return null

        return { ...service, distance: calculatedDistance }
      })
      .filter(Boolean)
      .sort((a, b) => (a!.distance as number) - (b!.distance as number))

    return NextResponse.json(filtered)
  } catch (error) {
    const err = error as Error
    console.error('Error fetching service:', err)
    return NextResponse.json(
      { message: 'Error fetching service', error: err.message },
      { status: 500 }
    )
  }
}