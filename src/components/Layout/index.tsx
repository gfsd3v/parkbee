import React from 'react'

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  /** Page content */
  children: React.ReactNode
}

/** Component shares layout structure between pages. Pass common sections like header, footer and content container here and wrap page components with it */
const Layout = ({ children }: LayoutProps) => {
  return <div className="w-screen h-screen overflow-hidden">{children}</div>
}

export default Layout
