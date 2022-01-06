import React, { useState } from 'react'
import Nav from './Nav'
import Seo from '../elements/Seo'
import Logo from '../elements/Logo'
import { usePathname } from '../../utils/usePathname'

interface LayoutProps {
  children: React.ReactNode
  noMobileMargin?: boolean
}

const Layout = ({ children, noMobileMargin }: LayoutProps) => {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)

  const hideMenu = pathname.includes('gallery') || pathname.includes('products')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div>
      <Seo />
      <div className='w-full flex justify-end'>
        <Nav toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <main
        className={`${
          noMobileMargin ? 'mx-0' : 'mx-4'
        } pt-20 md:mx-8 uppercase`}
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
