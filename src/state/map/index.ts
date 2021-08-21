import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/state/store'
import { ViewportProps } from 'react-map-gl'

interface MapState {
  viewport: ViewportProps
  country: string
}

const initialState: MapState = {
  viewport: {
    latitude: 52.3589,
    longitude: 4.8765,
    zoom: 15,
    transitionDuration: 3000,
  },
  country: 'nl',
}

// Slice
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setViewport: (state: MapState, action: PayloadAction<ViewportProps>) => {
      const { payload } = action
      state.viewport = payload
    },
  },
})

// Selectors
export const mapSelector = (state: RootState) => state.map

// Actions
export const { setViewport } = mapSlice.actions

// Reducers
export default mapSlice.reducer
