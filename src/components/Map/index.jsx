/* TODO
 Find alternative for react-map-gl-geocoder with TS support
*/
import * as React from 'react'
import MapGL, { FlyToInterpolator, Marker as DefaultMarker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { useSelector } from 'react-redux'
import { uiSelector } from '@/state/ui'
import { easeExp } from 'd3-ease'
import Marker from '@/components/Marker'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2ZzZDN2IiwiYSI6ImNrc2pwb3o2OTJmdmUyd3JvZGtoemsyYWsifQ.K_7NGnqAc-4XdiDK3fd7ow'

const MAP_LIGHT_STYLE = 'mapbox://styles/gfsd3v/cksjqckdq42ts17pegmmw5mzk'
const MAP_DARK_STYLE = 'mapbox://styles/gfsd3v/cksnk9ull5f6x17o3b5hfzu1e'

/*
  Here we need to treat the viewport that comes from the redux store
  sense its not recommended to set non-serializable values at redux
  we need to add/remove the transitionEasing and transitionInterpolator
  from the viewport obj that we use at MapGL/redux store
*/
const Map = ({
  children,
  viewportChange,
  viewport,
  garages,
  activeGarage,
  activeParkingGarageId,
  onGarageSelect,
  country,
  onTransitionEnd,
  onMapLoad,
  onMapClick,
}) => {
  const { themeMode } = useSelector(uiSelector)
  const mapRef = React.useRef()
  const inputContainerRef = React.useRef()
  const viewportWithTransition = {
    ...viewport,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeExp,
    onTransitionEnd: onTransitionEnd,
  }

  const handleViewportChange = React.useCallback(newViewportWithTransition => {
    const newViewportWithoutTransition = { ...newViewportWithTransition }
    delete newViewportWithoutTransition.transitionInterpolator
    delete newViewportWithoutTransition.transitionEasing
    viewportChange(newViewportWithoutTransition)
  }, [])

  const renderMarkers = () => {
    return garages.map((garage, index) => (
      <DefaultMarker
        offsetLeft={-36 / 2}
        offsetTop={-36}
        key={garage.garageId}
        longitude={garage.longitude}
        latitude={garage.latitude}
      >
        <Marker
          active={activeGarage?.garageId === garage.garageId}
          activeParking={activeParkingGarageId === garage.garageId}
          index={index}
          value={garage}
          onSelect={onGarageSelect}
        >
          <p className="text-sm">{activeParkingGarageId === garage.garageId ? 'P' : `€${garage.basePrice}`}</p>
        </Marker>
      </DefaultMarker>
    ))
  }

  return (
    <>
      <div
        data-test="search-input-container"
        ref={inputContainerRef}
        className="w-4/5 max-w-screen-md z-10 absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2;"
      />
      <MapGL
        {...viewportWithTransition}
        ref={mapRef}
        mapStyle={themeMode === 'light' ? MAP_LIGHT_STYLE : MAP_DARK_STYLE}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={handleViewportChange}
        height="100%"
        width="100%"
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={inputContainerRef}
          countries={country}
          clearAndBlurOnEsc
          clearOnBlur
          onViewportChange={handleViewportChange}
          marker={false}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          placeholder="Where do you want to park?"
        />
        {renderMarkers()}
        {children}
      </MapGL>
    </>
  )
}

export default Map
