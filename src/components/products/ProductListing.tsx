import React from 'react'
import ProductCard from './ProductCard'
import { ProductType } from '../../../types'

interface ProductListingProps {
  products: ProductType[]
}

const ProductListing = ({ products }: ProductListingProps) => {
  return (
    <div className='sm:grid gap-2 sm:grid-cols-3 lg:grid-cols-3'>
      {products.map(
        (product, index) =>
          product.totalInventory > 0 && (
            <ProductCard
              product={product}
              key={product.id}
              eager={index === 0}
            />
          )
      )}
    </div>
  )
}
export default ProductListing
