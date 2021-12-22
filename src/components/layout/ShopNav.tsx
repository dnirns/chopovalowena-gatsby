import { graphql, useStaticQuery, Link } from 'gatsby'
import React, { useState } from 'react'
import slugify from '@sindresorhus/slugify'

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

  console.log(selectedProductType)

  const handleSelect = (productType: string) => {
    setSelectedProductType(productType.toLowerCase())
    setNavOpen(false)
  }

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase space-y-1'>
      <div className='relative w-full h-full flex flex-col text-left'>
        <button
          className='uppercase text-left hover:text-blue-500'
          onClick={() => setNavOpen(true)}
        >
          {title}
        </button>
        <div
          className={`${
            navOpen ? 'block' : 'hidden'
          } flex flex-col relative pt-2 bg-white left-0 leading-none space-y-1 `}
          onMouseLeave={() => setNavOpen(false)}
        >
          <Link
            key='All'
            className=''
            to='/products/'
            activeClassName='text-violet-500 font-bold'
            onClick={() => handleSelect('All')}
          >
            All
          </Link>

          {productTypes.map((name) => (
            <Link
              key={name}
              className='hover:text-pink-500'
              to={`/products/${slugify(name)}`}
              activeClassName='text-violet-500 font-bold '
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
