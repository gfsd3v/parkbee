import React from 'react'

interface ICustomCSSVar extends React.CSSProperties {
  '--value': string
}

const getSeconds = (timer: number) => `0${timer % 60}`.slice(-2)
const getMinutes = (timer: number) => `0${Math.floor(timer / 60) % 60}`.slice(-2)
const getHours = (timer: number) => `0${Math.floor(timer / 3600)}`.slice(-2)

const Count: React.FC<{ timer: number }> = ({ timer }) => {
  return (
    <span className="countdown">
      <span style={{ '--value': getHours(timer) } as ICustomCSSVar}></span>:
      <span style={{ '--value': getMinutes(timer) } as ICustomCSSVar}></span>:
      <span style={{ '--value': getSeconds(timer) } as ICustomCSSVar}></span>
    </span>
  )
}

export default Count
