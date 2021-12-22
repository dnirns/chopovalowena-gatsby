import React from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../../context/store-context'
import ShopNav from './ShopNav'
import CartButton from '../elements/CartButton'
import GalleryNav from './GalleryNav'

interface NavProps {
  className?: string
}

const Nav = ({ className }: NavProps) => {
  const { checkout } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <nav
      className={`${className} text-2xl flex fixed z-10 bg-white items-start pt-2 px-10 justify-end h-auto w-full`}
    >
      <Link to='/' className='font-bold hover:text-red-500 w-[120px] '>
        home
      </Link>
      <div className='w-[120px]'>
        <GalleryNav title='GALLERY' />
      </div>

      <div className='w-[120px]'>
        <ShopNav title='shop' />
      </div>
      <CartButton quantity={quantity} />
    </nav>
  )
}

export default Nav
