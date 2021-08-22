import React, { useState } from 'react'

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState)
  const [timerOn, setTimerOn] = useState(false)

  React.useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null

    if (timerOn) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1)
      }, 1000)
    } else if (!timerOn) {
      interval && clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerOn])

  const handleStart = () => {
    setTimerOn(true)
  }

  const resetTimer = () => {
    setTimerOn(false)
    setTimer(0)
  }

  return { timer, handleStart, resetTimer }
}

export default useTimer
