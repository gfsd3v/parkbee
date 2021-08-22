import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// TODO
// Find alternative for react-map-gl-geocoder with TS support
// eslint-disable-next-line
import Map from '@/components/Map'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import GarageCard from '@/components/GarageCard'
import { mapSelector, setViewport } from '@/state/map'
import { garagesSelector, getAvailableGarages, setActiveGarage } from '@/state/garages'
import { showModal } from '@/state/modal'
import { IGarage } from '@/services/garageMockService/interfaces'

const IndexPage = () => {
  const dispatch = useDispatch()
  const mapState = useSelector(mapSelector)
  const garagesState = useSelector(garagesSelector)

  React.useEffect(() => {
    /*
        Here I would set the getAvailableGarages method to use
        the `mapState.viewport` values to search for garages only at the current location
        and add thresholds using the `mapState.viewport` values to dispatch
        this action when the user is navigating through the map
    */
    dispatch(getAvailableGarages())
  }, [])

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
        description: `Please confirm that you want to park at ${garage.name} - ${garage.streetAddress} for €${garage.basePrice}/hour.`,
        onAccept: () => console.log('confirmed'),
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
          country={mapState.country}
          onMapClick={() => dispatch(setActiveGarage(null))}
          onTransitionEnd={() => dispatch(getAvailableGarages())}
        >
          <div className="block w-screen h-screen">
            <div className="flex items-center justify-center w-full h-full"></div>
          </div>
        </Map>
      )}
      <div className="absolute z-10 inset-x-0 bottom-0 ">
        <div className="flex w-full justify-center p-4 md:p-14">
          {garagesState.active && <GarageCard onStartParking={handleParkingStart} garage={garagesState.active} />}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
