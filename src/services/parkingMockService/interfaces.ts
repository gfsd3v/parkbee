export interface IStartPayload {
  garageId: string
  doorId?: string
  registrationNumber?: string
}

export interface IStartResponse {
  transactionId: string
}
