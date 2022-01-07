/* eslint-disable react/prop-types */
import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { ProductType } from '../../../types'

const ProductCard = ({ product, eager }) => {
  const { title, priceRangeV2, slug, images, storefrontImages } = product

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
    <GatsbyImage
      alt={images[0]?.altText || title}
      image={images[0]?.gatsbyImageData || storefrontImageData}
      loading={eager ? 'eager' : 'lazy'}
      placeholder='blurred'
      objectFit='contain'
      className='hover:opacity-90 hover:cursor-pointer'
    />
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
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
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
