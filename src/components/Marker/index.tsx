import React from 'react'

const Marker: React.FC<{
  value: any
  onSelect: React.Dispatch<any>
  index: number
  active: boolean
  activeParking: boolean
}> = ({ children, onSelect, value, index, active, activeParking }) => {
  return (
    <>
      <div
        onClick={() => onSelect(value)}
        onKeyPress={() => onSelect(value)}
        role="button"
        className={`${active ? 'active' : ''} 
        ${
          activeParking ? 'active-parking' : ''
        } outline-none customized-marker text-white duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
        tabIndex={index}
      >
        {children}
      </div>
    </>
  )
}

export default Marker
