import React, { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../../context/store-context'
import Nav from './Nav'
import Seo from '../elements/Seo'
import Logo from '../elements/Logo'
import CartSlider from '../screens/CartSlider'
import { usePathname } from '../../utils/usePathname'

interface LayoutProps {
  children: React.ReactNode
  noMobileMargin?: boolean
  noMargin?: boolean
}

const Layout = ({ children, noMobileMargin, noMargin }: LayoutProps) => {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)

  const hideMenu = pathname.includes('gallery') || pathname.includes('products')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleToggleCart = () => {
    setCartOpen(!cartOpen)
  }

  return (
    <div>
      <Seo />
      <CartSlider cartOpen={cartOpen} toggleSlider={handleToggleCart} />
      <div className='w-full flex justify-end'>
        <Nav
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          toggleCart={handleToggleCart}
        />
      </div>

      <main
        className={`${noMobileMargin && 'mx-0 md:mx-4'} ${
          noMargin ? 'mx-0' : 'mx-4'
        } pt-10 md:pt-20 uppercase`}
      >
        {children}
      </main>
      {!hideMenu && (
        <Logo className='fixed w-full md:w-1/2 bottom-0 right-0 p-4 bg-white' />
      )}
    </div>
  )
}

export default Layout
