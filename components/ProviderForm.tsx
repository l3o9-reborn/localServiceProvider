'use client '
import React, {  useState } from 'react'
import { FileUpload } from './ui/file-upload'
import { ServiceFormInterface } from '@/lib/serviceFormInterface'
import { supabase  } from '@/lib/supabaseClient'

// import LocationPicker from './LocationPicker'

import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('./LocationPicker'), {
  ssr: false,
})

function ProviderForm() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [servicesInput, setServicesInput] = useState('')
  const [skillsInput, setSkillsInput] = useState('')
  const [fileUploadKey, setFileUploadKey] = useState(Date.now())
  const [form, setForm] = useState<ServiceFormInterface>({
    name: '',
    number: '',
    services: [],
    skills: [],
    bio: '',
    lat: null,
    lng: null,
    image: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleImageChage = (file: File | '') => {
    setForm((prev) => ({
      ...prev,
      image: file || '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)

    let imageUrl= ''

    if (form.image && form.image instanceof File) {
      const uniqueName = `${Date.now()}-${form.image.name}`
      const { data, error } = await supabase.storage
        .from('serviceproviderimage')
        .upload(`services/${form.name}/${uniqueName}`, form.image)
      if (error) throw error

      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('serviceproviderimage')
        .getPublicUrl(data.path)
      imageUrl = publicUrlData.publicUrl


            setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }))
    }


      // Validate required fields
  if (
    !form.name.trim() ||
    !form.number.trim() ||
    !form.services.length ||
    !form.skills.length ||
    !form.bio.trim() ||
    form.lat === null ||
    form.lng === null ||
    !form.image
  ) {
    setError(true)
    alert('Please fill in all required fields.')
    return
  }

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('number', form.number)
      formData.append('services', JSON.stringify(form.services))
      formData.append('skills', JSON.stringify(form.skills))
      formData.append('bio', form.bio)
      formData.append('lat', form.lat?.toString() || '')
      formData.append('lng', form.lng?.toString() || '')
      formData.append('image', imageUrl)


      setLoading(true)
      const res = await fetch('/api/service', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        alert('Something Is Wrong, Failed to Submit Service')
        throw new Error('Failed to submit service')
      }
      console.log('Response:', res)
      setForm({
              name: '',
              number: '',
              services: [],
              skills: [],
              bio: '',
              lat: null,
              lng: null,
              image: '',
            })
      setServicesInput('')
      setSkillsInput('')
      setFileUploadKey(Date.now())

      setLoading(false)
      setError(false)
      alert('Service submitted successfully!')
    } catch (error) {
      setError(true)
      console.error('Error submitting service:', error)
    }
  }

  // if(loading) {
  //   return <LoadingPage />
  // }


  return (
    <div className="h-full bg-gray-100 md:p-10 py-10   font-mono">
      <h1 className="w-full text-center text-heading text-amber-600 ">
        Register As A Service Provider
      </h1>
      <div className="h-full text-gray-50 bg-gray-800 p-5 md:m-20  rounded-2xl shadow-lg shadow-amber-600 ">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 ">
            <label
              className="inline-block relative top-4 left-5 bg-gray-800 w-25 text-gray-50 text-subheading"
              htmlFor=""
            >
              Full name
            </label>
            <input
              name="name"
              type="text"
              placeholder='eg. Rahim Uddin'
              value={form.name}
              onChange={handleChange}
              className="bg-gray-800  px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              className="inline-block relative top-4 left-5 bg-gray-800 w-33 text-gray-50 text-subheading"
              htmlFor=""
            >
              Phone Number
            </label>
            <input
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder='eg. +8801234567890'
              type="text"
              className=" bg-gray-800 text-white px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              className="inline-block relative top-4 left-5 bg-gray-800 w-33 text-gray-50 text-subheading"
              htmlFor=""
            >
              Service Type
            </label>
            <input
              value={servicesInput}
              placeholder='eg. Plumber, Electrician, Carpenter, etc.'
              onChange={(e) => setServicesInput(e.target.value)}
              onBlur={() =>
                setForm((prev) => ({
                  ...prev,
                  services: servicesInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              type="text"
              className=" bg-gray-800 text-white px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              className="inline-block relative top-4 left-5 bg-gray-800 w-16 text-gray-50 text-subheading"
              htmlFor=""
            >
              Skills
            </label>
            <input
              name="skills"
              placeholder='eg. Plumbing, Electrical Work, Carpentry, etc.'
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onBlur={() =>
                setForm((prev) => ({
                  ...prev,
                  skills: skillsInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              type="text"
              className=" bg-gray-800 text-white px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              className="inline-block relative top-4 left-5 bg-gray-800 w-8 text-gray-50 text-subheading"
              htmlFor=""
            >
              Bio
            </label>
            <textarea
              name="bio"
              placeholder='Tell us about your experience and services you provide'
              value={form.bio}
              onChange={handleChange}
              rows={6}
              className=" bg-gray-800 text-white px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>

          {/* here I want to integrate map input */}
          <div>
            <div>Pick Your Working Location</div>
                     <LocationPicker
            onLocationSelect={(location) => {
              setForm((prev) => ({ ...prev, lat: location.lat, lng: location.lng }))
            }}
            userLocation={
              form.lat !== null && form.lng !== null
                ? { lat: form.lat, lng: form.lng }
                : null
            }
            providers={[]}
            selectedProviderId={null}
            onMarkerClick={() => null}
          />
          </div>

          <div>
            <FileUpload key={fileUploadKey} onChange={handleImageChage} />
          </div>

          {error && (
            <div className="text-center text-red-500 mt-2 p-4 text-bold">
              Please fill in all required fields.
            </div>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer px-12 py-4 bg-amber-600 rounded-md text-gray-50 font-bold hover:bg-amber-500"
          >
           {loading ? (
            <>
              <svg
                className="animate-spin w-full h-5 mx-auto text-white"
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
              Registering...
            </>
          ) : (
            <span>Register As A Service Provider</span>
          )}
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default ProviderForm
