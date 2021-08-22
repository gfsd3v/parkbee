import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ParkingService from '@/services/parkingMockService'
import { IGarage } from '@/services/garageMockService/interfaces'
import { RootState } from '@/state/store'
import dayjs from 'dayjs'

export interface IParking {
  garageId: string
  transactionId: string
  startetedAt: Date
}

interface ParkingState {
  active: IParking | null
  startParkingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ParkingState = {
  active: null,
  startParkingStatus: 'idle',
}

export const startParkingTransaction = createAsyncThunk(
  'parking/startParking',
  async (garage: IGarage, { dispatch }) => {
    try {
      const payload = { garageId: garage.garageId, doorId: garage.doors[0].doorId }
      const transactionId: string = await ParkingService.startParkingTransaction(payload)
      dispatch(setActiveParking({ garageId: garage.garageId, transactionId: transactionId, startetedAt: dayjs() }))
    } catch (e) {
      console.error(e)
      throw e
    }
  }
)

// Slice
const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setActiveParking(state, { payload: parkingData }) {
      state.active = parkingData
    },
  },
  extraReducers: builder => {
    builder.addCase(startParkingTransaction.pending, state => {
      state.startParkingStatus = 'loading'
    }),
      builder.addCase(startParkingTransaction.fulfilled, state => {
        state.startParkingStatus = 'succeeded'
      }),
      builder.addCase(startParkingTransaction.rejected, state => {
        state.startParkingStatus = 'failed'
      })
  },
})

// Selectors
export const parkingSelector = (state: RootState) => state.parking

// Actions
export const { setActiveParking } = parkingSlice.actions

// Reducers
export default parkingSlice.reducer
