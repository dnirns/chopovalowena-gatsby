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
  menuOpen: boolean
  toggleMenu: () => void
  toggleCart: () => void
}

const Nav = ({ className, menuOpen, toggleMenu, toggleCart }: NavProps) => {
  const { cartQuantity, didJustAddToCart } = useContext(StoreContext)

  const pathname = usePathname()

  console.log(pathname)

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
        className={`${className} global-text-sizes transition fixed z-20 mt-[-10px] 2xl:mt-[-10px] hidden h-auto w-full items-start justify-between bg-white px-2 pt-2  md:flex`}
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
        <div className='flex w-1/2 translate-desktop-nav justify-between px-2'>
          <NavItems />
        </div>
      </nav>
      {/* ===== mobile nav ===== */}
      <div className='z-30 flex w-full justify-between uppercase md:hidden bg-white '>
        <h1 className={`${titleColour} px-4 pt-5 text-5xl`}>
          {pageTitle.replace('/', '')}
        </h1>
        {!menuOpen && pathname && (
          <div className='fixed top-0 right-0 z-30 '>
            <CartIcon onClick={toggleCart} className='h-8 w-8' />
            <MenuButton className='h-6 w-6' onClick={toggleMenu} />
          </div>
        )}

        <nav
          className={`${
            menuOpen ? 'translate-x-0' : 'translate-x-[100%]'
          } no-scroll fixed top-0 left-0  mb-16 flex h-full w-screen flex-col bg-white p-6 text-5xl transition duration-300 ease-in-out z-30`}
        >
          <CloseButton
            onClick={toggleMenu}
            className='absolute top-1 right-1 m-4 h-[30px] w-[30px]'
          />

          <div className='absolute h-full flex-col  flex'>
            <NavItems onClick={toggleMenu} />
          </div>

          <Link
            to='/'
            className='hover:opacity-70 transition-opacity duration-200 ease-in-out'
          >
            <Logo className='absolute bottom-0 self-center bg-white py-4' />
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
