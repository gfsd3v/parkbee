import React from 'react'
import Map from '@/components/Map'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { mapSelector, setViewport } from '@/state/map'
import { useSelector, useDispatch } from 'react-redux'
import { getAvailableGarages } from '@/state/garages'

const IndexPage = () => {
  const dispatch = useDispatch()
  const mapState = useSelector(mapSelector)

  const handleViewportChange = React.useCallback(newViewport => {
    dispatch(setViewport(newViewport))
  }, [])

  React.useEffect(() => {
    /*
        Here I would set the getAvailableGarages method use
        the `mapState` values to search for garages only at the current location
    */
    dispatch(getAvailableGarages())
  }, [])

  return (
    <Layout>
      <Seo title="Parkbee" />
      {mapState.viewport && (
        <Map viewport={mapState.viewport} viewportChange={handleViewportChange}>
          <div className="z-10 block w-screen h-screen">
            <div className="flex items-center justify-center w-full h-full">
              <label htmlFor="my-modal-2" className="btn btn-primary modal-button">
                open modal
              </label>
              <input type="checkbox" id="my-modal-2" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box transform">
                  <p>
                    Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto illo eaque.
                    Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem minima.
                  </p>
                  <div className="modal-action">
                    <label htmlFor="my-modal-2" className="btn btn-primary">
                      Accept
                    </label>
                    <label htmlFor="my-modal-2" className="btn">
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Map>
      )}
      {/* <div className="z-10 bottom-0 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
      {/*   <div> */}
      {/*     <button className="btn btn-primary">New York City</button> */}
      {/*   </div> */}
      {/* </div> */}
    </Layout>
  )
}

export default IndexPage
