import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import GarageService from '@/services/garageMockService'
import { IGarage } from '@/services/garageMockService/interfaces'
import { RootState } from '@/state/store'

interface GaragesState {
  availables: IGarage[] | []
  active: IGarage | null
}

const initialState: GaragesState = {
  availables: [],
  active: null,
}

export const getAvailableGarages = createAsyncThunk('garages/getAvailableGarages', async (_, { dispatch }) => {
  try {
    const res: IGarage[] = await GarageService.getAvailableGarages()
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
    setActiveGarage(state, { payload: garage }) {
      state.active = garage
    },
    deactiveGarage(state) {
      state.active = null
    },
  },
})

// Selectors
export const garagesSelector = (state: RootState) => state.garages

// Actions
export const { setAvailableGarages, setActiveGarage, deactiveGarage } = garagesSlice.actions

// Reducers
export default garagesSlice.reducer
