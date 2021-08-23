import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store, { RootState, Thunk, Dispatch } from '@/state/store'

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

interface UIState {
  themeMode: ThemeMode
}

const initialState: UIState = {
  themeMode: ThemeMode.LIGHT,
}

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state: UIState, action: PayloadAction<ThemeMode>) => {
      const { payload } = action
      state.themeMode = payload
    },
  },
})

// Reducers
export default uiSlice.reducer

// Selectors
export const uiSelector = (state: RootState) => state.ui

// Actions
export const { setThemeMode } = uiSlice.actions

// Thunks
export const toggleThemeMode = (): Thunk => (dispatch: Dispatch) => {
  const { themeMode } = store.getState().ui
  const mode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT

  dispatch(setThemeMode(mode))
}
