import React, { useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { useSelector, useDispatch } from 'react-redux'
import { themeChange } from 'theme-change'
import { uiSelector, toggleThemeMode } from '@/state/ui'

import Modal from '@/components/Modal'

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()
  const { themeMode } = useSelector(uiSelector)

  useEffect(() => {
    themeChange(false)
  }, [])

  const onToggle = React.useCallback(() => dispatch(toggleThemeMode()), [themeMode])

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="z-10 top-44 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ThemeToggle
          onClick={onToggle}
          data-set-theme={themeMode === 'light' ? 'dark' : 'light'}
          currentTheme={themeMode}
        />
      </div>
      <Modal />
      {children}
    </div>
  )
}

export default Layout
