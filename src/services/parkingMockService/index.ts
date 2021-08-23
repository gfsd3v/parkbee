import { IStartPayload } from '@/services/parkingMockService/interfaces'

const MOCKED_TRANSACTION_ID = 'ab83c36e-993b-4e84-a12b-c617886162ab'

const min = Math.ceil(10)
const max = Math.floor(200)

const MOCKED_PARKING_PRICE = Math.floor(Math.random() * (max - min) + min)

class ParkingService {
  static startParkingTransaction = async (payload: IStartPayload): Promise<string> => {
    console.log('Start Parking Transaction Payload', payload)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCKED_TRANSACTION_ID)
      }, 3000)
    })
  }

  static endParkingTransaction = async (transactionId: string): Promise<number> => {
    console.log('End Parking Transction Payload', transactionId)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCKED_PARKING_PRICE)
      }, 3000)
    })
  }
}

export default ParkingService
