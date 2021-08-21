import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import GarageService from '@/services/garageMockService'

import { IGarageAvailability } from '@/services/garageMockService/interfaces'
import { RootState } from '@/state/store'

interface GaragesState {
  availables: IGarageAvailability[] | []
}

const initialState: GaragesState = {
  availables: [],
}

export const getAvailableGarages = createAsyncThunk('garages/getAvailableGarages', async (_, { dispatch }) => {
  try {
    const res: IGarageAvailability[] = await GarageService.getAvailableGarages()
    dispatch(setAvailableGarages(res))
  } catch (e) {
    console.error(e)
    throw e
  }
})

// Slice
const garagesSlice = createSlice({
  name: 'garages',
  initialState,
  reducers: {
    setAvailableGarages(state, { payload: availableGarages }) {
      state.availables = availableGarages
    },
  },
})

// Selectors
export const garagesSelector = (state: RootState) => state.garages

// Actions
export const { setAvailableGarages } = garagesSlice.actions

// Reducers
export default garagesSlice.reducer
