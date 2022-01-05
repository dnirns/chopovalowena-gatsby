import { graphql, useStaticQuery, Link } from 'gatsby'
import React, { useState } from 'react'
import slugify from '@sindresorhus/slugify'
import { useLocation } from '@reach/router'

interface ShopNavProps {
  title: string
}

const ShopNav = ({ title }: ShopNavProps) => {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  const [navOpen, setNavOpen] = useState(false)
  const [selectedProductType, setSelectedProductType] = useState('')

  const location = useLocation()

  const handleSelect = (productType: string) => {
    setSelectedProductType(productType.toLowerCase())
    setNavOpen(false)
  }

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase max-w-[2.2em] '>
      <div className='relative w-full h-full flex flex-col'>
        <button
          className='uppercase text-left hover:text-clyellow'
          onClick={() => setNavOpen(true)}
        >
          {title}
        </button>
        <div
          className={`${
            navOpen ? 'block' : 'hidden'
          } flex flex-col texts-left bg-white leading-none space-y-1 relative `}
          onMouseLeave={() => setNavOpen(false)}
        >
          <div></div>
          <Link
            key='All'
            className=''
            to='/products/'
            activeClassName='text-clyellow '
            onClick={() => handleSelect('All')}
          >
            All
          </Link>

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
        </div>
      </div>
    </nav>
  )
}

export default ShopNav
