import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../../context/store-context'
import { usePathname } from '../../utils/usePathname'
import ShopNav from './ShopNav'
import GalleryNav from './GalleryNav'
import { MenuButton, CloseButton } from '../elements/ToggleButtons'
import Logo from '../elements/Logo'

interface NavProps {
  className?: string
  menuOpen: boolean
  toggleMenu: () => void
}

const Nav = ({ className, menuOpen, toggleMenu }: NavProps) => {
  const { checkout } = useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  // ==== Keep for Cart Icon  ==== //
  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const pathname = usePathname()

  const pageTitle = pathname.includes('gallery')
    ? 'COLLECTIONS'
    : pathname.includes('product')
    ? 'SHOP'
    : pathname.toUpperCase()

  const titleColour =
    pageTitle === 'COLLECTIONS'
      ? 'text-clpink'
      : pageTitle === 'SHOP'
      ? 'text-clyellow'
      : pageTitle === 'ABOUT'
      ? 'text-clgreen'
      : pageTitle === 'CONTACT'
      ? 'text-clblue'
      : 'text-clred'

  return (
    <>
      <nav
        className={`${className} global-text-sizes hidden md:flex fixed z-20 bg-white pt-2 px-2 h-auto w-full justify-end `}
      >
        <div className='flex w-1/2 justify-evenly'>
          <NavItems />
        </div>
      </nav>
      {/* ===== mobile nav ===== */}
      <div className='flex justify-between w-full md:hidden z-20 uppercase '>
        <h1 className={`${titleColour} text-6xl pt-6 px-4`}>{pageTitle}</h1>

        {!menuOpen && (
          <MenuButton
            onClick={toggleMenu}
            className='z-40 fixed top-0 right-0 '
          />
        )}

        <nav
          className={`${
            menuOpen ? 'translate-x-0' : 'translate-x-[100%]'
          } transition ease-in-out duration-300 fixed top-0 left-0 h-full w-screen bg-white z-20 flex flex-col text-5xl p-6 mb-16 no-scroll `}
        >
          <CloseButton
            onClick={toggleMenu}
            className='absolute top-0 right-0'
          />

          <div className='absolute h-full overflow-y-scroll flex flex-col w-full'>
            <NavItems onClick={toggleMenu} />
          </div>

          <Logo className='self-center absolute bottom-0 bg-white py-4' />
        </nav>
      </div>
    </>
  )
}

type NavItemsProps = {
  onClick?: () => void
}

const NavItems = ({ onClick }: NavItemsProps) => {
  const pathname = usePathname()
  return (
    <>
      <Link
        to='/about'
        className={`${
          pathname.includes('about') && 'text-clgreen'
        } hover:text-clgreen `}
        onClick={onClick}
      >
        ABOUT
      </Link>
      <div>
        <GalleryNav toggleNav={onClick} title='collections ' />
      </div>
      <div>
        <ShopNav toggleNav={onClick} title='shop' />
      </div>
      <Link
        to='/contact'
        className={`${
          pathname.includes('contact') && 'text-clblue'
        } hover:text-clblue `}
        onClick={onClick}
      >
        CONTACT
      </Link>
      <Link
        to='/stockists'
        className={`${
          pathname.includes('stockists') && 'text-clred'
        } hover:text-clred `}
        onClick={onClick}
      >
        STOCKISTS
      </Link>
    </>
  )
}

export default Nav
