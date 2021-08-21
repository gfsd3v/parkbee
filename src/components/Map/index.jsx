import * as React from 'react'
import MapGL, { FlyToInterpolator } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { easeExp } from 'd3-ease'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2ZzZDN2IiwiYSI6ImNrc2pwb3o2OTJmdmUyd3JvZGtoemsyYWsifQ.K_7NGnqAc-4XdiDK3fd7ow'

/*
  Here we need to treat the viewport that comes from the redux store
  sense its not recommended to set non-serializable values at redux
  we need to add/remove the transitionEasing and transitionInterpolator
  from the viewport obj that we use at MapGL/redux store
*/
const Map = ({ children, viewportChange, onGarageSelect, viewport }) => {
  const mapRef = React.useRef()
  const viewportWithTransition = {
    ...viewport,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeExp,
  }
  const handleViewportChange = newViewportWithTransition => {
    const newViewportWithoutTransition = { ...newViewportWithTransition }
    delete newViewportWithoutTransition.transitionInterpolator
    delete newViewportWithoutTransition.transitionEasing
    viewportChange(newViewportWithoutTransition)
  }

  return (
    <MapGL
      ref={mapRef}
      mapStyle="mapbox://styles/gfsd3v/cksjqckdq42ts17pegmmw5mzk"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={handleViewportChange}
      height="100%"
      width="100%"
      {...viewportWithTransition}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleViewportChange}
        marker={false}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        placeholder="Where do you want to park?"
        position="top-left"
      />
      {children}
    </MapGL>
  )
}

export default Map
