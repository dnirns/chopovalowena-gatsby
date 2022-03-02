import React from 'react'

interface ArrowProps {
  className: string
  onClick: () => void
}
const Arrow = ({ className, onClick }: ArrowProps) => {
  return (
    <div
      className={`${className}  transition-opacity duration-150`}
      onClick={onClick}
    >
      <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 24 24.8'
        xmlSpace='preserve'
      >
        <polygon points='0,0 0,6.2 16.1,12.4 0,18.7 0,24.8 24.1,15.5 24.1,9.3 ' />
      </svg>
    </div>
  )
}

export default Arrow
