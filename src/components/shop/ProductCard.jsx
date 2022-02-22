/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { ProductType } from '../../../types'

const ProductCard = ({ product, eager }) => {
  const { title, priceRangeV2, slug, images, storefrontImages } = product

  const [image, setImage] = useState(0)

  // const handleHover = (index) => {
  //   setImage(index)
  // }

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
    // <div
    //   onMouseOver={() => handleHover(images.length - 1)}
    //   onMouseOut={() => handleHover(0)}
    // >
    <GatsbyImage
      alt={images[image]?.altText || title}
      image={images[image]?.gatsbyImageData || storefrontImageData}
      loading={eager ? 'eager' : 'lazy'}
      placeholder='blurred'
      objectFit='contain'
      className='hover:opacity-90 hover:cursor-pointer hover:scale-[102%] transition ease-in-out duration-200'
    />
    // </div>
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
      gatsbyImageData(height: 500, width: 350, placeholder: BLURRED)
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
