export interface ServiceFormInterface {
  name: string
  number: string
  services: string[]
  skills: string[]
  bio: string
  lat: number | null
  lng: number | null
  image: File | string
}

export interface ServiceFinderDetails {
  serviceName: string
  lat: number | null
  lng: number | null
}


export interface CustomerPresentableInterface {
  id: string,
  name: string,
  distance: number,
  number: string,
  services: string[],
  skills: string[],
  bio: string,
  lat: number | null,
  lng: number | null,
  image: string,
  created_at: string,
}