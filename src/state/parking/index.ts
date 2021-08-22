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
  endParkingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  lastParkingPrice: number | null
}

const initialState: ParkingState = {
  active: null,
  startParkingStatus: 'idle',
  endParkingStatus: 'idle',
  lastParkingPrice: null,
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

export const endParkingTransaction = createAsyncThunk('parking/endParking', async (_, { dispatch, getState }) => {
  const { parking } = getState() as { parking: ParkingState }
  try {
    if (!parking.active?.transactionId)
      throw 'No active parking was found at the Parking store, something is very wrong'
    const payload = parking.active.transactionId
    const parkingPrice = await ParkingService.endParkingTransaction(payload)
    dispatch(endActiveParking(parkingPrice))
  } catch (e) {
    console.error(e)
    throw e
  }
})

// Slice
const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setActiveParking(state, { payload: parkingData }) {
      state.active = parkingData
    },
    endActiveParking(state, { payload: parkingPrice }) {
      state.active = null
      state.lastParkingPrice = parkingPrice
    },
    resetRequestsStatus(state) {
      state.startParkingStatus = 'idle'
      state.endParkingStatus = 'idle'
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
      }),
      builder.addCase(endParkingTransaction.pending, state => {
        state.endParkingStatus = 'loading'
      }),
      builder.addCase(endParkingTransaction.fulfilled, state => {
        state.endParkingStatus = 'succeeded'
      }),
      builder.addCase(endParkingTransaction.rejected, state => {
        state.endParkingStatus = 'failed'
      })
  },
})

// Selectors
export const parkingSelector = (state: RootState) => state.parking

// Actions
export const { setActiveParking, endActiveParking, resetRequestsStatus } = parkingSlice.actions

// Reducers
export default parkingSlice.reducer
