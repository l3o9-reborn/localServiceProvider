'use client'
import React from 'react'
import ServiceProviderSection from '@/components/ServiceProviderSection'
import BecomeAServiceProvider from '@/components/BecomeAServiceProvider'
import ServiceCardGroup from '@/components/ServiceCardGroup'
import ProviderForm from '@/components/ProviderForm'

function BeAServiceProvider() {
  return (
    <div className="">
      <BecomeAServiceProvider />
      <ServiceCardGroup />
      <ProviderForm />
    </div>
  )
}

export default BeAServiceProvider
