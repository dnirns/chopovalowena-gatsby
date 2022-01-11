import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { ProductType } from '../../../types'
import ProductSlider from '../screens/ProductSlider'

interface ProductListingProps {
  products: ProductType[]
}

const ProductListing = ({ products }: ProductListingProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    products[0]
  )
  const [showSlider, setShowSlider] = useState(false)

  const handleProductClick = (product: ProductType) => {
    setSelectedProduct(product)
    setShowSlider(true)
  }

  const handleCloseSlider = () => {
    setShowSlider(false)
  }

  return (
    <div className={`${showSlider && 'md:justify-end '} flex w-full`}>
      {/* ===== when slider is open, main grid snaps to right side so all products are still visible */}
      <div
        className={`${
          showSlider
            ? 'md:w-1/2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
            : 'md:grid-cols-4 lg:grid-cols-4 w-full'
        } grid grid-cols-2  marker:gap-2 `}
      >
        {products && (
          <ProductSlider
            closeSlider={handleCloseSlider}
            product={selectedProduct}
            showSlider={showSlider}
          />
        )}

        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className='relative flex items-center justify-center cursor-pointer'
          >
            {/* ===== Banner for items with sale tag */}
            {product.tags?.filter((tag) => tag === 'sale').length > 0 && (
              <span className='absolute z-10 w-[85%] bg-clpink bg-opacity-70 p-0 text-center pt-0.5 text-white text-sm md:text-xs xl:text-sm -rotate-12'>
                SALE
              </span>
            )}
            <ProductCard
              product={product}
              key={product.id}
              eager={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductListing
