import { Garages } from '@/services/garageMockService/garageMockData'
import { IGarage } from '@/services/garageMockService/interfaces'

class GarageService {
  static getAvailableGarages = async (): Promise<IGarage[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Garages)
      }, 10)
    })
  }
}

export default GarageService
