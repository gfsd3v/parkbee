import React from 'react'
import ColoredBadge from '@/components/ColoredBadge'
import CollapsableDoorsList from '@/components/CollapsableDoorsList'
import MarkerIcon from '@/icons/marker.svg'
import { IGarage } from '@/services/garageMockService/interfaces'

const GarageCard: React.FC<{ garage: IGarage; onStartParking: (garage: IGarage) => void }> = ({
  garage,
  onStartParking,
}) => {
  const { garageName, capacity, availableSpaces, basePrice, streetAddress, doors, photos } = garage

  return (
    <div className="card bordered bg-base-100 lg:card-side lg:max-w-4xl	lg:h-full ">
      <div className="flex-1 w-full justify-center lg:w-4/12 lg:flex lg:h-auto lg:justify-start lg:overflow-hidden lg:max-w-4/5">
        <img
          alt="garage"
          src={garage.photos[0].urls[1].url}
          className="object-cover w-full max-h-44 lg:min-h-full lg:max-h-full"
        />
      </div>
      <div className="card-body justify-between">
        <div>
          <div className="flex min-w-full justify-between prose mb-2">
            <h3 className="m-0 mr-4">{garageName}</h3>
            <ColoredBadge color="success">{`${availableSpaces}/${capacity} spots`}</ColoredBadge>
          </div>
          <div className="flex items-center mb-2">
            <MarkerIcon className="w-4 h-4 mr-1" />
            <p className="text-sm font-light">{streetAddress}</p>
          </div>
          <CollapsableDoorsList doors={doors} />
        </div>
        <div className="grid gap-3 grid-rows-2 sm:grid-rows-none sm:grid-cols-2">
          <div className="flex w-full justify-center sm:justify-start sm:w-auto items-end">
            <h3 className="font-medium text-3xl">€{basePrice}</h3>
            <p className="font-light text-lg text-base-300">/hour</p>
          </div>
          <button className="btn btn-primary btn-md" onClick={() => onStartParking(garage)}>
            Start parking
          </button>
        </div>
      </div>
    </div>
  )
}

export default GarageCard
