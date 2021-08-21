/* TODO
 Find alternative for react-map-gl-geocoder with TS support
*/
import * as React from 'react'
import MapGL, { FlyToInterpolator, Marker as DefaultMarker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import Marker from '@/components/Marker'
import { easeExp } from 'd3-ease'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2ZzZDN2IiwiYSI6ImNrc2pwb3o2OTJmdmUyd3JvZGtoemsyYWsifQ.K_7NGnqAc-4XdiDK3fd7ow'

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
  onGarageSelect,
  country,
  onTransitionEnd,
  onMapClick,
}) => {
  const mapRef = React.useRef()
  const inputContainerRef = React.useRef()
  const viewportWithTransition = {
    ...viewport,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeExp,
    onTransitionEnd: onTransitionEnd,
    width: '100%',
    heigh: '100%',
  }

  const handleViewportChange = React.useCallback(newViewportWithTransition => {
    const newViewportWithoutTransition = { ...newViewportWithTransition }
    delete newViewportWithoutTransition.transitionInterpolator
    delete newViewportWithoutTransition.transitionEasing
    viewportChange(newViewportWithoutTransition)
  }, [])

  const renderMarkers = React.useCallback(() => {
    return garages.map((garage, index) => (
      <DefaultMarker key={garage.garageId} longitude={garage.longitude} latitude={garage.latitude}>
        <Marker
          active={activeGarage?.garageId === garage.garageId}
          index={index}
          value={garage}
          onSelect={onGarageSelect}
        >
          <p className="prose prose-sm">€{garage.basePrice}</p>
        </Marker>
      </DefaultMarker>
    ))
  }, [garages, activeGarage])

  return (
    <>
      <div
        ref={inputContainerRef}
        className="w-4/5 max-w-screen-md z-10 absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2;"
      />
      <MapGL
        ref={mapRef}
        mapStyle="mapbox://styles/gfsd3v/cksjqckdq42ts17pegmmw5mzk"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={handleViewportChange}
        height="100%"
        width="100%"
        onClick={onMapClick}
        {...viewportWithTransition}
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
