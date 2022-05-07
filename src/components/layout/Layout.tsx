import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'
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
  noNav?: boolean
  openMenu?: boolean
}

const Layout = ({
  children,
  noMobileMargin,
  noMargin,
  noNav,
  openMenu,
}: LayoutProps) => {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)

  const hideMenu = pathname.includes('gallery') || pathname.includes('products')

  const { toggleCart, isCartOpen, toggleMobileNav, isMobileNavOpen } =
    useContext(StoreContext)

  const toggleMenu = () => {
    toggleMobileNav()
    isCartOpen && toggleCart()
    // setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    openMenu && toggleMobileNav()
  }, [openMenu])

  return (
    <div>
      <Seo />
      <CartSlider cartOpen={isCartOpen} toggleSlider={toggleCart} />
      {!noNav && (
        <div className='flex w-full justify-end'>
          <Nav
            toggleMobileNav={toggleMenu}
            mobileNavOpen={isMobileNavOpen}
            toggleCart={toggleCart}
          />
        </div>
      )}

      <main
        className={`${noMobileMargin && 'mx-0 md:mx-4'} ${
          noMargin ? 'mx-0' : 'mx-4'
        } pt-10 uppercase md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14`}
      >
        {children}
      </main>
      {!hideMenu && (
        <Link
          to='/'
          className='hover:opacity-70 transition-opacity duration-200 ease-in-out'
        >
          <Logo className='fixed bottom-0 right-0 w-full bg-white p-4 md:w-1/2' />
        </Link>
      )}
    </div>
  )
}

export default Layout
