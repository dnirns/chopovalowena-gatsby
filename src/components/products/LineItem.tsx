import React, { useState, useContext, useMemo } from 'react'
import { StoreContext } from '../../context/store-context'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { XIcon } from '@heroicons/react/outline'
import { LineItemType } from '../../../types'

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
    <div className='grid gap-4 grid-cols-4 text-xs my-8'>
      <div className='col-span-1 space-y-4 text-center'>
        <p className='font-semibold text-neutral-600'>{item.title}</p>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </div>
      <div className='col-span-1 flex items-start justify-evenly space-x-8'>
        <div>{item.variant.title}</div>
        <p>{quantity}</p>
        <button onClick={handleRemove}>
          <XIcon className='w-4 h-4' />
        </button>
      </div>

      <div className='flex space-x-8 col-span-2 items-evenly justify-start'>
        <div>
          <p>Price</p>
          <p className='font-bold'>{price}</p>
        </div>

        <div>
          <p>Subtotal</p>
          <p className='font-bold'>{subtotal}</p>
        </div>
      </div>
    </div>
  )
}

export default LineItem
