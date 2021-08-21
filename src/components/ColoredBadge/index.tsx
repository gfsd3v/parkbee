import React from 'react'

const ColoredBadge: React.FC<{ color: 'success' | 'warning' }> = ({ color, children }) => {
  return (
    <div
      className={`flex min-w-max max-h-10 w-max bg-opacity-20 rounded jusify-center items-center bg-${color} text-success`}
    >
      <div className="font-medium py-1 px-4">{children}</div>
    </div>
  )
}

export default ColoredBadge
