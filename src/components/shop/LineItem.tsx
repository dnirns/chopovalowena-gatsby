import React, { useState, useContext, useMemo } from 'react'
import { StoreContext } from '../../context/store-context'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { LineItemType } from '../../../types'
import { CloseButton } from '../elements/ToggleButtons'

interface LineItemProps {
  item: LineItemType
}

const LineItem = ({ item }: LineItemProps) => {
  const { removeLineItem, checkout } = useContext(StoreContext)

  const [quantity, setQuantity] = useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  }
  const price = Number(item.variant.priceV2.amount)

  const subtotal = Number(item.variant.priceV2.amount) * quantity

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const image = useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: 'constrained',
        width: 160,
      }),
    [variantImage.src]
  )

  return (
    <div className='grid gap-2 grid-cols-6 text-xs my-8 uppercase'>
      <div className='col-span-1 flex items-center justify-center'>
        <CloseButton onClick={handleRemove} className='h-5 w-5 xl:h-6 xl:w-6' />
      </div>
      <div className='col-span-1'>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </div>
      <div className='col-span-2 flex items-center justify-center text-center'>
        <h5 className='text-xs lg:text-sm xl:text-base'>{item.title}</h5>
      </div>

      <div className='col-span-1 flex items-center justify-center'>
        <p className='text-base xl:text-xl'>{quantity}</p>
      </div>

      <div className='col-span-1 flex items-center justify-evenly'>
        <p className='text-base xl:text-xl'>£{subtotal}</p>
      </div>
    </div>
  )
}

export default LineItem