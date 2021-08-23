import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ParkingService from '@/services/parkingMockService'
import { IGarage } from '@/services/garageMockService/interfaces'
import { RootState } from '@/state/store'
import { deactiveGarage } from '@/state/garages'
import dayjs from 'dayjs'

export interface IParking {
  garage: IGarage
  transactionId: string
  startetedAt: Date
}

export interface ILastParkingData {
  garage: IGarage
  transactionId: string
  price: number
}

interface ParkingState {
  active: IParking | null
  startParkingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  endParkingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  lastParkingData: ILastParkingData | null
}

const initialState: ParkingState = {
  active: null,
  startParkingStatus: 'idle',
  endParkingStatus: 'idle',
  lastParkingData: null,
}

export const startParkingTransaction = createAsyncThunk(
  'parking/startParking',
  async (garage: IGarage, { dispatch }) => {
    try {
      // TODO
      // Add support to door selection
      const payload = { garageId: garage.garageId, doorId: garage.doors[0].doorId }
      const currentDate = dayjs()
      const transactionId: string = await ParkingService.startParkingTransaction(payload)
      dispatch(setActiveParking({ garage: garage, transactionId: transactionId, startetedAt: currentDate }))
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
    const { garage, transactionId } = parking.active
    const price = await ParkingService.endParkingTransaction(transactionId)
    dispatch(deactiveGarage())
    dispatch(endActiveParking({ garage, transactionId, price }))
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
    endActiveParking(state, { payload: lastParkingData }) {
      state.lastParkingData = lastParkingData
      state.active = null
    },
    resetRequestsStatus(state) {
      state.startParkingStatus = 'idle'
      state.endParkingStatus = 'idle'
    },
    resetLastParkingData(state) {
      state.lastParkingData = null
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
export const { setActiveParking, endActiveParking, resetRequestsStatus, resetLastParkingData } = parkingSlice.actions

// Reducers
export default parkingSlice.reducer
