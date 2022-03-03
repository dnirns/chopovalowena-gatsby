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
    <div className='grid gap-2 grid-cols-7 text-xs my-8 uppercase breaks px-2'>
      <div className='col-span-1 pr-2'>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </div>
      <div className='col-span-3 flex items-center justify-center text-center breaks'>
        <h5 className='text-[10px] xl:text-sm'>{item.title}</h5>
      </div>

      <div className='col-span-1 flex items-center justify-center breaks'>
        <p className='text-base xl:text-xl'>{quantity}</p>
      </div>

      <div className='col-span-1 flex items-center justify-end text-center'>
        <p className='text-base xl:text-xl'>£{subtotal}</p>
      </div>
      <div className='col-span-1 flex items-center justify-center'>
        <CloseButton
          onClick={handleRemove}
          className='h-[12px] w-[12px] ml-4'
        />
      </div>
    </div>
  )
}

export default LineItem
