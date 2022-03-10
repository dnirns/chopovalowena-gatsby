import React from 'react'
import { CloseButton } from '../elements/ToggleButtons'

interface SliderProps {
  toggleSlider: () => void
  children: React.ReactNode
  open: boolean
  desktopOnly?: boolean
}

const Slider = ({
  desktopOnly,
  toggleSlider,
  open,

  children,
}: SliderProps) => {
  return (
    <div
      className={`${!open && '-translate-x-[100%]'} ${
        desktopOnly ? 'hidden md:flex' : 'flex'
      } fixed top-0 left-0 z-50 h-screen w-screen bg-white transition duration-300  ease-in-out md:w-1/2 `}
    >
      <CloseButton
        onClick={toggleSlider}
        className='fixed top-4 left-4 h-[32px] w-[32px] md:w-6 md-h-6'
      />
      {children}
    </div>
  )
}

export default Slider
