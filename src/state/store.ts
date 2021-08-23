import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ThunkAction } from 'redux-thunk'
import uiReducer from '@/state/ui'
import mapReducer from '@/state/map'
import garagesReducer from '@/state/garages'
import modalReducer from '@/state/modal'
import parkingReducer from '@/state/parking'

const rootReducer = combineReducers({
  ui: uiReducer,
  map: mapReducer,
  garages: garagesReducer,
  modal: modalReducer,
  parking: parkingReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'parking/setActiveParking',
          'map/showModal',
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoreState: true,
      },
    }),
})

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
