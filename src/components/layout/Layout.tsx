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

  const hideMenu = pathname.includes('gallery') || pathname.includes('products')

  const { toggleCart, isCartOpen } = useContext(StoreContext)

  const toggleMenu = () => {
    isCartOpen && toggleCart()
    setMenuOpen(!menuOpen)
  }

  return (
    <div>
      <Seo />
      <CartSlider cartOpen={isCartOpen} toggleSlider={toggleCart} />
      <div className='flex w-full justify-end'>
        <Nav
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          toggleCart={toggleCart}
        />
      </div>

      <main
        className={`${noMobileMargin && 'mx-0 md:mx-4'} ${
          noMargin ? 'mx-0' : 'mx-4'
        } pt-10 uppercase md:pt-20`}
      >
        {children}
      </main>
      {!hideMenu && (
        <Logo className='fixed bottom-0 right-0 w-full bg-white p-4 md:w-1/2' />
      )}
    </div>
  )
}

export default Layout
