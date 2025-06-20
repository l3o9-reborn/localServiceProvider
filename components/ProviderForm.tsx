'use client '
import React, {  useState } from 'react'
import { FileUpload } from './ui/file-upload'
import { ServiceFormInterface } from '@/lib/serviceFormInterface'
import LoadingPage from '@/app/loading'

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


  const handleImageChage = (file: File | null) => {
    setForm((prev) => ({
      ...prev,
      image: file || '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
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
      if (form.image) {
        formData.append('image', form.image)
      }

      setLoading(true)
      const res = await fetch('http://localhost:3000/api/service', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        throw new Error('Failed to submit service')
      }
      console.log('Response:', res)

      setLoading(false)
      setError(false)
      alert('Service submitted successfully!')
    } catch (error) {
      setError(true)
      console.error('Error submitting service:', error)
    }
  }

  if(loading) {
    return <LoadingPage />
  }
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-red-500">An error occurred. Please try again.</h1>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-100 p-10  font-mono">
      <h1 className="w-full text-center text-heading text-amber-600 ">
        Register As A Service Provider
      </h1>
      <div className="h-full text-white bg-gray-800 p-5 md:m-20  rounded-2xl shadow-lg shadow-amber-600 ">
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
              value={form.name}
              onChange={handleChange}
              className="px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
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
              type="text"
              className="px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
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
              className="px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
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
              className="px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
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
              value={form.bio}
              onChange={handleChange}
              rows={6}
              className="px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600"
            />
          </div>
          {/* <div className='border-2 border-amber-600 p-2 my-4 rounded-2xl text-amber-600'>
                <div className='flex flex-col gap-1' >
                    <label htmlFor="" className='inline-block relative top-4 left-5 bg-gray-800 w-19 text-gray-50 text-subheading'>Address</label>
                    <input
                    name='address'
                    value={form.address}
                    onChange={handleChange}
                    type="text" className='px-6 py-4 border-2 border-gray-50 rounded-md outline-none hover:border-amber-400 focus:border-amber-600' />
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <input
                    name='union'
                    value={form.union}
                    onChange={handleChange}
                    type="text" placeholder='Union' className='px-6 py-4 border-2 border-gray-50 rounded-md  outline-none hover:border-amber-400 focus:border-amber-600' />
                    <input
                    name='subdistrict'
                    value={form.subdistrict}
                    onChange={handleChange}
                    type="text" placeholder='Subdistrict/Upzela' className='px-6 py-4 border-2 border-gray-50 rounded-md  outline-none hover:border-amber-400 focus:border-amber-600'  />
                    <input
                    name='district'
                    value={form.district}
                    onChange={handleChange}
                    type="text" placeholder='District' className='px-6 py-4 border-2 border-gray-50 rounded-md  outline-none hover:border-amber-400 focus:border-amber-600'  />
                    <input
                    name='post'
                    value={form.post}
                    onChange={handleChange}
                     type="text" placeholder='Post Code' className='px-6 py-4 border-2 border-gray-50 rounded-md  outline-none hover:border-amber-400 focus:border-amber-600'  />
                </div>
            </div> */}
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
            <FileUpload onChange={handleImageChage} />
          </div>

          <button
            type="submit"
            className="w-full px-12 py-4 bg-amber-600 rounded-md text-gray-50 font-bold hover:bg-amber-500"
          >
            Register As a Service Provider
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProviderForm
