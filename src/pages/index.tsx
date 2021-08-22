import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// TODO
// Find alternative for react-map-gl-geocoder with TS support
// eslint-disable-next-line
import Map from '@/components/Map'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import GarageCard from '@/components/GarageCard'
import { mapSelector, setViewport } from '@/state/map'
import { garagesSelector, getAvailableGarages, setActiveGarage } from '@/state/garages'
import { startParkingTransaction, parkingSelector } from '@/state/parking'
import { showModal, closeModal } from '@/state/modal'
import { IGarage } from '@/services/garageMockService/interfaces'

const IndexPage = () => {
  const dispatch = useDispatch()
  const mapState = useSelector(mapSelector)
  const garagesState = useSelector(garagesSelector)
  const parkingState = useSelector(parkingSelector)
  const { startParkingStatus } = parkingState

  React.useEffect(() => {
    dispatch(getAvailableGarages())
  }, [])

  React.useEffect(() => {
    if (startParkingStatus === 'succeeded') {
      toast.info('Parking action has successfully started')
    }
    startParkingStatus === 'failed' && toast.error('Error stating parking action')
  }, [startParkingStatus])

  const handleViewportChange = React.useCallback(newViewport => {
    dispatch(setViewport(newViewport))
  }, [])

  const handleGarageSelect = React.useCallback(
    (garage: IGarage) => {
      dispatch(setActiveGarage(garage))
    },
    [garagesState.active]
  )

  const handleParkingStart = React.useCallback(
    (garage: IGarage) => {
      const modalInfo = {
        title: 'Start parking?',
        description: `Please confirm that you want to start an parking action at ${garage.name} - ${garage.streetAddress} for €${garage.basePrice}/hour.`,
        onAccept: () => {
          if (!parkingState.active) {
            dispatch(startParkingTransaction(garage))
            dispatch(closeModal())
          } else {
            toast.error(`You already have an active parking transaction.`)
            dispatch(closeModal())
          }
        },
      }
      dispatch(showModal(modalInfo))
    },
    [garagesState.active]
  )

  return (
    <Layout>
      <Seo title="Parkbee" />
      {mapState.viewport && garagesState.availables.length && (
        <Map
          onGarageSelect={handleGarageSelect}
          viewport={mapState.viewport}
          viewportChange={handleViewportChange}
          garages={garagesState.availables}
          activeGarage={garagesState.active}
          activeParking={parkingState.active}
          country={mapState.country}
          onMapClick={(event: React.MouseEvent<HTMLElement>) =>
            (event.target as Element).id === 'mapWrapper' && dispatch(setActiveGarage(null))
          }
          onTransitionEnd={() => dispatch(getAvailableGarages())}
        >
          <div className="block w-screen h-screen">
            <div id="mapWrapper" className="flex items-end justify-center w-full h-full">
              <div className="flex w-full justify-center p-4 md:p-14">
                {garagesState.active && (
                  <GarageCard
                    activeParking={
                      parkingState.active &&
                      garagesState.active &&
                      parkingState.active.garageId === garagesState.active.garageId
                        ? parkingState.active
                        : null
                    }
                    onStartParking={handleParkingStart}
                    garage={garagesState.active}
                  />
                )}
              </div>
            </div>
          </div>
        </Map>
      )}
    </Layout>
  )
}

export default IndexPage
