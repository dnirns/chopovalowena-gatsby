import React from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../../context/store-context'
import ShopNav from './ShopNav'

import GalleryNav from './GalleryNav'

interface NavProps {
  className?: string
}

const Nav = ({ className }: NavProps) => {
  const { checkout } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  // const quantity = items.reduce((total, item) => {
  //   return total + item.quantity
  // }, 0)

  return (
    <nav
      className={`${className} md:text-[20px] lg:text-[28px] xl:text-3xl flex fixed z-10 bg-white items-start pt-2  justify-between h-auto w-1/2`}
    >
      <Link to='/' className='hover:text-red-500 '>
        about
      </Link>
      <div className=' '>
        <GalleryNav title='collections ' />
      </div>
      <div className=' '>
        <ShopNav title='shop' />
      </div>
      <Link to='/contact' className='hover:text-red-500   '>
        contact
      </Link>
      <Link to='/stockists' className='hover:text-red-500  '>
        stockists
      </Link>
    </nav>
  )
}

export default Nav
