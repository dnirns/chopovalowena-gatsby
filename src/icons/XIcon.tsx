import React from 'react'

interface XIconProps {
  className: string
}

const XIcon = ({ className }: XIconProps) => {
  return (
    <svg
      className={className}
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
  )
}

export default XIcon
