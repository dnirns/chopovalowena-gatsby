import React, { useContext } from 'react'
import { StoreContext } from '../../context/store-context'

interface CartIconProps {
  onClick: () => void
  className: string
}
const CartIcon = ({ onClick, className }: CartIconProps) => {
  const { cartQuantity } = useContext(StoreContext)

  return (
    <button
      className={`hover:opacity-60 transition ${className}`}
      onClick={onClick}
    >
      <div className='absolute top-3 -left-2 bg-clpink text-clgreen h-4 w-4 text-xs pt-0.5 rounded-full flex items-center justify-center'>
        <span>{cartQuantity}</span>
      </div>
      <svg
        id='Layer_1'
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 19.47'
      >
        <defs>
          <style>{`.cls-1,.cls-2,.cls-3{fill:none;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-1{stroke-width:2px;}.cls-2{stroke-width:3px;}`}</style>
        </defs>
        <path d='M14.94,4.08l-1,5.21H3.45l-1-5.21H14.94m2.43-2H0l1.81,9.21H15.56l1.81-9.21Z' />
        <polyline
          className='cls-1'
          points='24 0.97 20 0.97 17.37 13.47 1.75 13.47'
        />
        <circle className='cls-2' cx='4.25' cy='17.43' r='0.57' />
        <circle className='cls-2' cx='15.18' cy='17.43' r='0.57' />
        <line className='cls-3' y1='2.08' x2='2.6' y2='15.35' />
      </svg>
    </button>
  )
}

export default CartIcon
