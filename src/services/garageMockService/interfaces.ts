export interface IGarageDoor {
  doorId: string
  doorType?: string
  description?: string
  streetAddress?: string
}

export interface IGaragePhotoUrl {
  name: string
  size: string
  url: string
}

export interface IGaragePhoto {
  description: string
  urls: IGaragePhotoUrl[]
  extension: string
}

export interface IGarage {
  garageId: string
  garageName: string
  name: string
  zoneNumber: number
  availableSpaces: number
  capacity: number
  latitude: number
  longitude: number
  basePrice: number
  dailyCap: number
  streetAddress: string
  postalCode: string
  city: string
  countryCode: string
  doors: IGarageDoor[]
  photos: IGaragePhoto[]
}
