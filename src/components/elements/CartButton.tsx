import React from 'react'

import { Link } from 'gatsby'
import { ShoppingCartIcon } from '@heroicons/react/outline'

interface MoreButtonProps {
  quantity: number
}

const CartButton = ({ quantity }: MoreButtonProps) => {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to='/cart'
      className='relative p-0'
    >
      <ShoppingCartIcon className='h-7 w-7' />
      {quantity > 0 && (
        <div className='bg-violet-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold h-3 w-3 p-2 absolute -top-1 -right-1'>
          {quantity}
        </div>
      )}
    </Link>
  )
}

export default CartButton
