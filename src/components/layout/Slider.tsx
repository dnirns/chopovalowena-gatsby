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
      } transition ease-in-out duration-300 fixed h-screen md:w-1/2 w-screen bg-white z-40  top-0 left-0 `}
    >
      <CloseButton
        onClick={toggleSlider}
        className='absolute m-4 top-0 left-0'
      />
      {children}
    </div>
  )
}

export default Slider
