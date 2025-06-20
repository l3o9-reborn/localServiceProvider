import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { ServiceFormInterface } from '@/lib/serviceFormInterface'

export async function POST(request: NextRequest) {
  try {
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
      image: formData.get('image') as File | string, // image can be a File or a string (path)
    }
    

    // Handle file upload if image is a File
    if (serviceForm.image instanceof File) {
        console.log('Uploading image:', serviceForm.image.name)
      const { data, error } = await supabase.storage
        .from('serviceproviderimage')
        .upload(
          `services/${serviceForm.name}/${serviceForm.image.name}`,
          serviceForm.image,
        )
      if (error) throw error
    // Get public URL right after upload
    const { data: publicUrlData } = supabase.storage
        .from('serviceproviderimage')
        .getPublicUrl(data.path)

    // Store the full public URL
    serviceForm.image = publicUrlData.publicUrl
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
  const serviceName = searchParams.get('serviceName')
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const distance = parseFloat(searchParams.get('distance') || '')
  const radiusKm = distance || 5 // Default to 5 KM if not provided

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  try {
    const { data, error } = await supabase
      .from('service_form')
      .select('*')

    if (error) throw error

    // Filter and map to include distance
    const filtered = data
     //fixed eslint error any 
      .map((service: ServiceFormInterface) => {
        if (
          !Array.isArray(service.services) ||
          typeof service.lat !== 'number' ||
          typeof service.lng !== 'number' ||
          isNaN(lat) ||
          isNaN(lng)
        ) {
          return null
        }
        // Service name match (partial, case-insensitive)
        const matchesService = service.services.some((s: string) =>
          s.toLowerCase().includes((serviceName || '').toLowerCase())
        )
        if (!matchesService) return null

        // Calculate distance
        const distance = getDistanceFromLatLonInKm(lat, lng, service.lat, service.lng)
        if (distance > radiusKm) return null

        // Return service with distance property
        return { ...service, distance }
      })
      .filter(Boolean) // Remove nulls

    return NextResponse.json(filtered)
  } catch (error) {
    //fixed eslint error any 
    const err = error as Error
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { message: 'Error fetching service', error: err.message },
      { status: 500 },
    )
  }
}