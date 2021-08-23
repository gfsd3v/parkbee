import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { mapSelector, setViewport } from '@/state/map'
import { garagesSelector, getAvailableGarages, setActiveGarage } from '@/state/garages'
import {
  startParkingTransaction,
  endParkingTransaction,
  resetRequestsStatus,
  resetLastParkingData,
  parkingSelector,
} from '@/state/parking'
import { showModal, closeModal } from '@/state/modal'
import { IGarage } from '@/services/garageMockService/interfaces'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import JetpackLoader from '@/components/JetpackLoader'
import GarageCard from '@/components/GarageCard'
import ParkingSuccessCard from '@/components/ParkingSuccessCard'
// TODO
// Find alternative for react-map-gl-geocoder with TS support
// eslint-disable-next-line
import Map from '@/components/Map'

const IndexPage = () => {
  const [isMapLoaded, setIsMapLoaded] = React.useState(false)
  const dispatch = useDispatch()
  const { viewport, country } = useSelector(mapSelector)
  const { active: activeGarage, availables: availableGarages } = useSelector(garagesSelector)
  const { lastParkingData, active: activeParking, startParkingStatus, endParkingStatus } = useSelector(parkingSelector)

  // Effects
  React.useEffect(() => {
    dispatch(getAvailableGarages())
  }, [])

  React.useEffect(() => {
    startParkingStatus === 'succeeded' && toast.info('Parking action has successfully started')
    startParkingStatus === 'failed' && toast.error('Error stating parking action')
    setTimeout(() => dispatch(resetRequestsStatus()), 3000)
  }, [startParkingStatus])

  React.useEffect(() => {
    endParkingStatus === 'succeeded' && toast.info('Parking has successfully ended, thank you for using ParkBee :)')
    endParkingStatus === 'failed' && toast.error('Error stating parking action')
    setTimeout(() => dispatch(resetRequestsStatus()), 3000)
  }, [endParkingStatus])

  // Handlers
  const handleViewportChange = React.useCallback(newViewport => {
    dispatch(setViewport(newViewport))
  }, [])

  const handleGarageSelect = React.useCallback((garage: IGarage) => dispatch(setActiveGarage(garage)), [activeGarage])

  const handleParkingStart = React.useCallback((garage: IGarage) => {
    const modalInfo = {
      title: 'Start parking?',
      description: `Please confirm that you want to start an parking action at ${garage.name} - ${garage.streetAddress} for €${garage.basePrice}/hour.`,
      mainButtonText: 'park',
      onAccept: () => {
        if (!activeParking) {
          dispatch(startParkingTransaction(garage))
          dispatch(closeModal())
        } else {
          toast.error(`You already have an active parking transaction.`)
          dispatch(closeModal())
        }
      },
    }
    dispatch(showModal(modalInfo))
  }, [])

  const handleParkingEnd = React.useCallback(() => {
    const modalInfo = {
      title: 'End parking?',
      description: `Please confirm that you want to finish an parking action.`,
      mainButtonText: 'end parking',
      mainButtonColor: 'error',
      onAccept: () => {
        dispatch(endParkingTransaction())
        dispatch(closeModal())
      },
    }
    dispatch(showModal(modalInfo))
  }, [])

  return (
    <Layout>
      <Seo title="Parkbee" />
      {viewport && availableGarages.length && (
        <Map
          onGarageSelect={handleGarageSelect}
          viewport={viewport}
          viewportChange={handleViewportChange}
          garages={availableGarages}
          activeGarage={activeGarage}
          activeParkingGarageId={activeParking?.garage?.garageId}
          country={country}
          onMapClick={(event: React.MouseEvent<HTMLElement>) => {
            const mapWrapperElements = ['mapWrapper', 'bottomMapWrapper']
            mapWrapperElements.includes((event.target as Element).id) && dispatch(setActiveGarage(null))
          }}
          onTransitionEnd={() => dispatch(getAvailableGarages())}
          onMapLoad={() => setIsMapLoaded(true)}
        >
          {isMapLoaded ? (
            <div className="block w-full h-full">
              <div id="mapWrapper" className="z-20 flex items-end justify-center w-full h-full">
                <div id="bottomMapWrapper" className="flex w-full justify-center p-4 md:p-14">
                  {activeGarage && (
                    <GarageCard
                      activeParking={
                        activeParking && activeParking.garage.garageId === activeGarage.garageId ? activeParking : null
                      }
                      onStartParking={handleParkingStart}
                      onEndParking={handleParkingEnd}
                      loading={startParkingStatus === 'loading' || endParkingStatus === 'loading'}
                      garage={activeGarage}
                    />
                  )}
                  {lastParkingData && (
                    <ParkingSuccessCard
                      onClose={() => dispatch(resetLastParkingData())}
                      parkingData={lastParkingData}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <JetpackLoader />
          )}
        </Map>
      )}
    </Layout>
  )
}

export default IndexPage
