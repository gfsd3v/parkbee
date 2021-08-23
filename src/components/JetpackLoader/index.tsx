import * as React from 'react'
import './style.css'

const Loader = () => {
  return (
    <div className="absolute z-20 h-full w-full bg-white">
      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="jetpack-subtitle">Loading...</h1>
    </div>
  )
}

export default Loader
