import React from 'react'
import styled from 'styled-components'

interface ToggleProps {
  currentTheme: string
  onClick?: () => void
  'data-set-theme'?: string
}

const ToggleContainer = styled.button`
  font-size: 1rem;
  width: 5.5em;
  height: 3em;
  border-radius: 1.5em;
  margin: 0 auto;
  padding: 0.125em;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s linear;
`

const Switch = styled.div<ToggleProps>`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  position: relative;
  transform: ${({ currentTheme }) => (currentTheme === 'light' ? 'translateX(0)' : 'translateX(2.5em)')};
  transition: inherit;
`
const Toggle: React.FC<ToggleProps> = ({ currentTheme, ...props }) => {
  return (
    <>
      <ToggleContainer data-act-class="shadow-outline" id="toggle-test" className="customm-toggle" {...props}>
        <Switch currentTheme={currentTheme} />
      </ToggleContainer>
    </>
  )
}

export default Toggle
