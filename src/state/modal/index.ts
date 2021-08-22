import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/state/store'

export interface IModal {
  title: string
  description: string
  onAccept: () => void
  mainButtonColor?: string
  mainButtonText?: string
}

interface ModalState {
  modal: IModal | null
}

const initialState: ModalState = {
  modal: null,
}

// Slice
const modalSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    showModal: (state: ModalState, action: PayloadAction<IModal>) => {
      const { payload } = action
      state.modal = payload
    },
    closeModal: (state: ModalState) => {
      state.modal = null
    },
  },
})

// Selectors
export const modalSelector = (state: RootState) => state.modal

// Actions
export const { showModal, closeModal } = modalSlice.actions

// Reducers
export default modalSlice.reducer
