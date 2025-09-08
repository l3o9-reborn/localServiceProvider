'use client'
import React, { useEffect, useState } from 'react'
import { ExpandableCardDemo } from '@/components/ExpandableCardForModification'
import { CustomerPresentableInterface } from '@/lib/serviceFormInterface'

export default function Collection() {
  const [services, setServices] = useState<CustomerPresentableInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/service/user', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setServices(data.services || [])
      } catch (error) {
        const err = error as Error 
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])



  // You can implement handleEdit as needed

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Uploaded Services</h1>
      {services.length === 0 && <div>No services found.</div>}
     
            <ExpandableCardDemo
              cards={services}
              onDeleteCard={id => setServices(prev => prev.filter(c => c.id !== id))}
            />
      
    </div>
  )
}