import React from 'react'
import ColoredBadge from '@/components/ColoredBadge'
import CollapsableDoorsList from '@/components/CollapsableDoorsList'
import MarkerIcon from '@/icons/marker.svg'
import { IGarage } from '@/services/garageMockService/interfaces'
import { IParking } from '@/state/parking'
import useTimer from '@/hooks/useTimer'
import useHover from '@/hooks/useHover'
import dayjs from 'dayjs'

interface ICustomCSSVar extends React.CSSProperties {
  '--value': string
}

const getSeconds = (timer: number) => `0${timer % 60}`.slice(-2)
const getMinutes = (timer: number) => `0${Math.floor(timer / 60) % 60}`.slice(-2)
const getHours = (timer: number) => `0${Math.floor(timer / 3600)}`.slice(-2)

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
    <div className="card bordered bg-base-100 lg:card-side lg:max-w-4xl	lg:h-full ">
      <div className="flex-1 w-full justify-center lg:w-4/12 lg:flex lg:h-auto lg:justify-start lg:overflow-hidden lg:max-w-4/5">
        <img
          alt="garage"
          src={photos[0].urls[1].url}
          className="object-cover w-full max-h-44 lg:min-h-full lg:max-h-full"
        />
      </div>
      <div className="card-body justify-between">
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
        <div className="grid gap-3 grid-rows-2 sm:grid-rows-none sm:grid-cols-2">
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
              {stopParkingBtnHover ? (
                'Finish parking'
              ) : (
                <span className="countdown">
                  <span style={{ '--value': getHours(timer) } as ICustomCSSVar}></span>:
                  <span style={{ '--value': getMinutes(timer) } as ICustomCSSVar}></span>:
                  <span style={{ '--value': getSeconds(timer) } as ICustomCSSVar}></span>
                </span>
              )}
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
