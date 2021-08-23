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
    <main>
      <div className="w-screen h-screen overflow-hidden">
        <div className="absolute flex items-center right-0 z-10 top-0 left-0 m-5 lg:block lg:right-unset">
          <ThemeToggle
            onClick={onToggle}
            data-set-theme={themeMode === 'light' ? 'dark' : 'light'}
            currentTheme={themeMode}
          />
        </div>
        <Modal />
        {children}
      </div>
    </main>
  )
}

export default Layout
