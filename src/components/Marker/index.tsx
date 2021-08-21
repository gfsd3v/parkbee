import React from 'react'

const Marker: React.FC<{ value: any; onSelect: React.Dispatch<any>; index: number; active: boolean }> = ({
  children,
  onSelect,
  value,
  index,
  active,
}) => {
  return (
    <>
      <div
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          onSelect(value)
        }}
        onKeyPress={e => {
          e.stopPropagation()
          e.preventDefault()
          onSelect(value)
        }}
        role="button"
        tabIndex={index}
        className={`w-8 text-white text-center cursor-pointer rounded ${active ? 'bg-secondary' : 'bg-base-content'}`}
      >
        {children}
      </div>
      <div
        className={`${
          active && 'active'
        } marker-after-polygon absolute border-8 border-solid left-1/2 bottom-0 -ml-2 -mb-3.5`}
      />
    </>
  )
}

export default Marker
