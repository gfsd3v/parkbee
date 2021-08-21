import React from 'react'
import { Provider } from 'react-redux'
import store from '@/state/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import '@fontsource/manrope/variable.css'
import '../../styles/index.css'

export interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

const persistor = persistStore(store)

/** This component wraps the whole application in App/Test/Storybook environments. Pass all global providers here and add global imports at the top of the file */
const wrapRootElement = ({ children }: RootWrapperProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default wrapRootElement
