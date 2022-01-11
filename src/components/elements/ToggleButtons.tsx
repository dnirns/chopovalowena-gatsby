import React from 'react'

interface ToggleButtonProps {
  className?: string
  onClick?: () => void
}

export const CloseButton = ({ className, onClick }: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} fixed h-8 w-8 m-6 hover:opacity-75 transition-opacity duration-200`}
    >
      <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 24 24'
        xmlSpace='preserve'
      >
        <g>
          <g>
            <path d='M7.6,12L0,4.5L4.5,0L12,7.6L19.5,0L24,4.5L16.4,12l7.6,7.5L19.5,24L12,16.4L4.5,24L0,19.5L7.6,12z' />
          </g>
        </g>
      </svg>
    </button>
  )
}

export const MenuButton = ({ className, onClick }: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} h-7 w-7 m-6 hover:opacity-75 transition-opacity duration-200 `}
    >
      <svg
        enableBackground='new 0 0 24 24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m0 0h24v6h-24z' />
        <path d='m0 18h24v6h-24z' />
        <path d='m0 9h24v6h-24z' />
      </svg>
    </button>
  )
}
