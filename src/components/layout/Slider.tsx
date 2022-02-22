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
      } fixed top-0 left-0 z-40 h-screen w-screen bg-white transition duration-300  ease-in-out md:w-1/2 `}
    >
      <CloseButton
        onClick={toggleSlider}
        className='absolute top-0 left-0 m-4'
      />
      {children}
    </div>
  )
}

export default Slider
