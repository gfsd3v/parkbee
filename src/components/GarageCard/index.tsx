import React from 'react'
import ColoredBadge from '@/components/ColoredBadge'
import CollapsableDoorsList from '@/components/CollapsableDoorsList'
import Count from '@/components/Count'
import { IGarage } from '@/services/garageMockService/interfaces'
import { IParking } from '@/state/parking'
import useTimer from '@/hooks/useTimer'
import useHover from '@/hooks/useHover'
import dayjs from 'dayjs'
import MarkerIcon from '@/icons/marker.svg'

const GarageCard: React.FC<{
  garage: IGarage
  activeParking: IParking | null
  onStartParking: (garage: IGarage) => void
  onEndParking: () => void
  loading: boolean
}> = ({ garage, activeParking, onStartParking, loading, onEndParking }) => {
  const startedAt = React.useMemo(() => {
    return activeParking ? Math.abs(dayjs(activeParking.startetedAt).diff(dayjs(), 'second')) : 0
  }, [activeParking, garage])
  const [stopParkingBtnHover, stopParkingBtnHoverProps] = useHover()
  const { timer, handleStart, resetTimer } = useTimer(startedAt)
  const { garageName, capacity, availableSpaces, basePrice, streetAddress, doors, photos } = garage

  React.useEffect(() => {
    activeParking && handleStart(startedAt)
    !activeParking && resetTimer()
  }, [activeParking])

  return (
    <div className="card bordered w-11/12 sm:w-9/12 bg-base-100 lg:card-side lg:max-w-3xl	lg:h-full xl:max-w-5xl">
      <div className="flex-1 w-full justify-center lg:w-7/12 lg:flex lg:h-auto lg:justify-start lg:overflow-hidden lg:max-w-4/5">
        <img
          alt="garage"
          src={photos[0].urls[1].url}
          className="object-cover w-full max-h-44 lg:min-h-full lg:max-h-full"
        />
      </div>
      <div className="card-body justify-between lg:w-4/12">
        <div>
          <div className="flex min-w-full justify-between mb-2">
            <h3 className="m-0 mr-4">{garageName}</h3>
            {activeParking ? (
              <ColoredBadge color="warning">Parking</ColoredBadge>
            ) : (
              <ColoredBadge color="success">{`${availableSpaces}/${capacity} spots`}</ColoredBadge>
            )}
          </div>
          <div className="flex items-center mb-2">
            <MarkerIcon className="w-4 h-4 mr-1" />
            <p className="text-sm font-light">{streetAddress}</p>
          </div>
          <CollapsableDoorsList doors={doors} />
        </div>
        <div className="grid justify-center gap-3 grid-rows-2 sm:grid-rows-none sm:grid-cols-2">
          <div className="flex w-full justify-center sm:justify-start sm:w-auto items-end">
            <h3 className="font-medium text-3xl">€{basePrice}</h3>
            <p className="font-light text-lg">/hour</p>
          </div>
          {activeParking ? (
            <button
              className={`btn btn-error btn-wide justify-self-end ${loading && 'loading'}`}
              onClick={() => onEndParking()}
              {...stopParkingBtnHoverProps}
            >
              {stopParkingBtnHover ? 'Finish parking' : <Count timer={timer} />}
            </button>
          ) : (
            <button
              className={`btn btn-primary btn-wide justify-self-end ${loading && 'loading'}`}
              onClick={() => onStartParking(garage)}
            >
              Start parking
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GarageCard
