import React from 'react'
import SuccessIllustration from '@/icons/success-illustration.svg'
import MarkerIcon from '@/icons/marker.svg'
import { ILastParkingData } from '@/state/parking'

const ParkingSuccessCard: React.FC<{ parkingData: ILastParkingData; onClose: () => void }> = ({
  parkingData,
  onClose,
}) => {
  const {
    garage: { streetAddress },
    price,
  } = parkingData

  return (
    <div className="container flex justify-center">
      <div className="card text-center bg-base-100 w-10/12 sm:w-8/12 lg:w-1/2 xl:w-2/6 shadow-2xl">
        <div className="flex justify-center px-10 pt-10">
          <SuccessIllustration className="w-60" />
        </div>
        <div className="card-body space-y-6">
          <h2 className="card-title">Parking ended successfully</h2>
          <p>Thank you for usign ParkBee, here its an overview about your parking :)</p>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <MarkerIcon className="w-6 h-6 mr-1" />
              <p className="font-light">{streetAddress}</p>
            </div>
            <div style={{ padding: 0 }} className="stat">
              <div className="stat-value">{`€${price}`}</div>
            </div>
          </div>
          <div className="justify-center card-actions">
            <button onClick={onClose} className="btn btn-primary">
              awesome
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkingSuccessCard
