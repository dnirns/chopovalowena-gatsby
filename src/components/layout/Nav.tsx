import React from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../../context/store-context'
import ShopNav from './ShopNav'
import { useLocation } from '@reach/router'

import GalleryNav from './GalleryNav'

interface NavProps {
  className?: string
}

const Nav = ({ className }: NavProps) => {
  const { checkout } = React.useContext(StoreContext)

  const location = useLocation()

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <nav
      className={`${className} global-text-sizes flex fixed z-10 bg-white pt-2 pr-4 h-auto w-full justify-end`}
    >
      <div className='flex w-1/2 justify-evenly'>
        <Link
          to='/about'
          className={`${
            location.pathname.includes('about') && 'text-clgreen'
          } hover:text-clgreen `}
        >
          about
        </Link>
        <div>
          <GalleryNav title='collections ' />
        </div>
        <div>
          <ShopNav title='shop' />
        </div>
        <Link
          to='/contact'
          className={`${
            location.pathname.includes('contact') && 'text-clblue'
          } hover:text-clblue `}
        >
          contact
        </Link>
        <Link
          to='/stockists'
          className={`${
            location.pathname.includes('stockists') && 'text-clred'
          } hover:text-clred `}
        >
          stockists
        </Link>
      </div>
    </nav>
  )
}

export default Nav
