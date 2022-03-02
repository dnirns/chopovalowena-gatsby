import { graphql, useStaticQuery, Link } from 'gatsby'
import { usePathname } from '../../utils/usePathname'
import React, { useState } from 'react'
import slugify from '@sindresorhus/slugify'

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

  const handleSelect = () => {
    toggleNav && toggleNav()
    setNavOpen(false)
  }

  const pathname = usePathname()

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase max-w-[2.2em] '>
      <div
        onMouseLeave={() => setNavOpen(false)}
        className='relative w-full h-full flex flex-col'
      >
        <button
          className={`${
            pathname.includes('products') && 'text-clyellow'
          } uppercase text-left hover:text-clyellow`}
          onClick={() => setNavOpen(!navOpen)}
        >
          {title}
        </button>
        <div
          className={`${
            navOpen ? 'block' : 'hidden'
          } flex flex-col texts-left bg-none leading-none relative md:-translate-y-1 xl:-translate-y-[.4rem]`}
          onMouseLeave={() => setNavOpen(false)}
        >
          {productTypes.map((name) => (
            <Link
              key={name}
              className='hover:text-clyellow'
              to={`/products/${slugify(name)}`}
              activeClassName='text-clyellow '
              onClick={() => handleSelect(name)}
            >
              {name}
            </Link>
          ))}
          <Link
            key='All'
            className='hover:text-clyellow'
            to='/products/'
            activeClassName='text-clyellow '
            onClick={() => handleSelect('All')}
          >
            All
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default ShopNav
