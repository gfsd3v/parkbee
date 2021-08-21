import React from 'react'

const ColoredBadge: React.FC<{ color: 'success' | 'warning' }> = ({ color, children }) => {
  const wrapperClasses =
    color === 'success'
      ? 'flex bg-success min-w-max max-h-10 w-max bg-opacity-20 rounded jusify-center items-center text-success'
      : 'flex bg-warning min-w-max max-h-10 w-max bg-opacity-20 rounded jusify-center items-center text-warning'

  return (
    <div className={wrapperClasses}>
      <div className="font-medium py-1 px-4">{children}</div>
    </div>
  )
}

export default ColoredBadge
