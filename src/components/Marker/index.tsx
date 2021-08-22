import React from 'react'

const Marker: React.FC<{
  value: any
  onSelect: React.Dispatch<any>
  index: number
  active: boolean
  activeParking: boolean
}> = ({ children, onSelect, value, index, active, activeParking }) => {
  const getClassname = (element: string) => {
    switch (element) {
      case 'baloon':
        if (active) {
          return 'transition z-20 duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-8 text-white text-center cursor-pointer rounded bg-secondary'
        } else if (activeParking) {
          return 'transition z-20 duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-8 text-white text-center cursor-pointer rounded bg-primary'
        }
        return 'transition z-20 duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-8 text-white text-center cursor-pointer rounded bg-base-content'
      case 'polygon':
        if (active) {
          return 'active marker-after-polygon absolute border-solid left-1/2 bottom-0'
        } else if (activeParking) {
          return 'active-parking marker-after-polygon absolute border-solid left-1/2 bottom-0'
        }
        return 'marker-after-polygon absolute border-solid left-1/2 bottom-0'
      default:
        return ''
    }
  }
  return (
    <>
      <div
        onClick={() => onSelect(value)}
        onKeyPress={() => onSelect(value)}
        role="button"
        tabIndex={index}
        className={getClassname('baloon')}
      >
        {children}
      </div>
      <div className={getClassname('polygon')} />
    </>
  )
}

export default Marker
