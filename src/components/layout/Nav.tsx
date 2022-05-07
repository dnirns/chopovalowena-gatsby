import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../../context/store-context'
import { usePathname } from '../../utils/usePathname'
import ShopNav from './ShopNav'
import GalleryNav from './GalleryNav'
import { MenuButton, CloseButton } from '../elements/ToggleButtons'
import Logo from '../elements/Logo'
import CartIcon from '../elements/CartIcon'

interface NavProps {
  className?: string
  mobileNavOpen: boolean
  toggleMobileNav: () => void
  toggleCart: () => void
}

const Nav = ({
  className,
  mobileNavOpen,
  toggleMobileNav,
  toggleCart,
}: NavProps) => {
  const { cartQuantity, didJustAddToCart } = useContext(StoreContext)

  const pathname = usePathname()

  const isShop = pathname.includes('products')

  const pageTitle = pathname.includes('gallery')
    ? 'COLLECTIONS'
    : pathname.includes('products')
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
        className={`${className} global-text-sizes transition fixed z-20 mt-[-15px] 2xl:mt-[-20px] hidden h-auto w-full items-start justify-between bg-white px-2 pt-2 md:flex`}
      >
        <button
          onClick={toggleCart}
          className={`${
            isShop ? 'visible' : 'invisible'
          } space-x-4 px-2 transition translate-desktop-nav hover:opacity-70`}
        >
          CART -
          <span
            className={`${
              didJustAddToCart ? 'text-clpink' : 'text-black'
            }  mx-2`}
          >
            {cartQuantity}
          </span>
        </button>
        <div className='flex w-1/2 translate-desktop-nav justify-between px-2 lg:px-3'>
          <NavItems />
        </div>
      </nav>
      {/* ===== mobile nav ===== */}
      <div className='z-30 flex w-full justify-between uppercase md:hidden bg-white'>
        {pathname && (
          <h1 className={`${titleColour} px-4 pt-5 text-4xl`}>
            {pageTitle.replace('/', '')}
          </h1>
        )}

        {!mobileNavOpen && pathname && (
          <div className='fixed top-0 right-0 z-30 '>
            <CartIcon onClick={toggleCart} className='h-8 w-8' />
            <MenuButton className='h-6 w-6' onClick={toggleMobileNav} />
          </div>
        )}

        <nav
          className={`${
            mobileNavOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }  fixed top-0 left-0 flex h-full w-screen flex-col bg-white px-4 py-6 text-4xl transition duration-300 ease-in-out z-30`}
        >
          <CloseButton
            onClick={toggleMobileNav}
            className='absolute top-1 right-1 m-4 h-[32px] w-[32px]'
          />

          <div className='h-full pb-16 flex-col overflow-scroll  no-scrollbar flex'>
            <NavItems onClick={toggleMobileNav} />
          </div>

          <Link
            onClick={toggleMobileNav}
            to='/'
            className='hover:opacity-70 transition-opacity duration-200 ease-in-out '
          >
            <Logo className='absolute bottom-0 w-full left-0 self-center bg-white p-4' />
          </Link>
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
  const { isMobileNavOpen } = useContext(StoreContext)
  return (
    <>
      <Link
        to='/about'
        className={`${
          pathname.includes('about') && !isMobileNavOpen && 'text-clgreen'
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
          pathname.includes('contact') && !isMobileNavOpen && 'text-clblue'
        } hover:text-clblue `}
        onClick={onClick}
      >
        CONTACT
      </Link>
      <Link
        to='/stockists'
        className={`${
          pathname.includes('stockists') && !isMobileNavOpen && 'text-clred'
        } hover:text-clred `}
        onClick={onClick}
      >
        STOCKISTS
      </Link>
    </>
  )
}

export default Nav
