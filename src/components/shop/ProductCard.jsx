/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'

const ProductCard = ({ product, eager }) => {
  const { title, priceRangeV2, slug, images, storefrontImages } = product

  const [image, setImage] = useState(0)

  const handleHover = (index) => {
    setImage(index)
  }

  // const price = priceRangeV2?.minVariantPrice.amount

  let storefrontImageData = {}

  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: 'contain',
        width: 350,
        height: 450,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      onMouseOver={() => handleHover(images.length > 1 ? 1 : 0)}
      onMouseOut={() => handleHover(0)}
    >
      <GatsbyImage
        alt={images[image]?.altText || title}
        image={images[image]?.gatsbyImageData || storefrontImageData}
        loading={eager ? 'eager' : 'lazy'}
        placeholder='blurred'
        objectFit='contain'
        className='hover:cursor-pointer  h-[250px] sm:h-[300px] lg:h-[400px]'
      />
    </div>
  )
}

export default ProductCard

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    totalInventory
    tags
    description
    productType
    # slug: gatsbyPath(
    #   filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    # )
    images {
      id
      altText
      gatsbyImageData(height: 1000, placeholder: BLURRED)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
      }
      maxVariantPrice {
        amount
      }
    }
    storefrontId
    variants {
      availableForSale
      inventoryQuantity
      storefrontId
      title
      price
      selectedOptions {
        name
        value
      }
    }
    options {
      name
      values
      id
    }
  }
`
