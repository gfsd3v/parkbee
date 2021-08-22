import { IStartPayload } from '@/services/parkingMockService/interfaces'

const MOCKED_TRANSACTION_ID = 'ab83c36e-993b-4e84-a12b-c617886162ab'

class ParkingService {
  static startParkingTransaction = async (payload: IStartPayload): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCKED_TRANSACTION_ID)
      }, 3000)
    })
  }
}

export default ParkingService
