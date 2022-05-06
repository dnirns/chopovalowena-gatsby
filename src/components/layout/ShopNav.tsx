import { graphql, useStaticQuery, Link } from 'gatsby'
import { usePathname } from '../../utils/usePathname'
import React, { useState, useRef, useContext } from 'react'
import { StoreContext } from '../../context/store-context'
import slugify from '@sindresorhus/slugify'

import useOutsideClick from '../../hooks/useOutsideClick'

interface ShopNavProps {
  title: string
  toggleNav?: () => void
}

const ShopNav = ({ title, toggleNav }: ShopNavProps) => {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct(filter: { totalInventory: { gt: 0 } }) {
        productTypes: distinct(field: productType)
      }
    }
  `)

  const [navOpen, setNavOpen] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)

  useOutsideClick(navRef, () => setNavOpen(false))
  const { isMobileNavOpen, toggleMobileNav } = useContext(StoreContext)

  const pathname = usePathname()

  const handleClickOption = () => {
    setNavOpen(false)
    isMobileNavOpen && toggleMobileNav()
  }

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase max-w-[2.2em] '>
      <div
        ref={navRef}
        onMouseLeave={() => setNavOpen(false)}
        className='relative w-full h-full flex flex-col'
      >
        <button
          className={`${
            pathname.includes('products') && !isMobileNavOpen && 'text-clyellow'
          } ${
            navOpen && 'text-clyellow'
          } uppercase text-left hover:text-clyellow`}
          onClick={() => setNavOpen(!navOpen)}
        >
          {title}
        </button>
        <div
          className={`${
            navOpen ? 'block' : 'hidden'
          } pl-2 md:pl-0 flex flex-col texts-left bg-none leading-none relative md:-translate-y-1 xl:-translate-y-[.4rem]`}
          onMouseLeave={() => setNavOpen(false)}
        >
          {productTypes.map((name) => (
            <Link
              key={name}
              className='hover:text-clyellow'
              to={`/products/${slugify(name)}`}
              activeClassName={!isMobileNavOpen && 'text-clyellow'}
              onClick={handleClickOption}
            >
              {name}
            </Link>
          ))}
          <Link
            key='All'
            className='hover:text-clyellow'
            to='/products/'
            activeClassName={!isMobileNavOpen && 'text-clyellow'}
            onClick={handleClickOption}
          >
            All
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default ShopNav
