import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'

const ProductCard = ({ product, eager }) => {
  const { title, priceRangeV2, slug, images, storefrontImages } = product

  const price = priceRangeV2?.minVariantPrice.amount

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
    <Link to={slug} aria-label={`View ${title} product page`}>
      <div className=' hover:scale-[101%] duration-150 flex flex-col item-center justify-center shadow-xl hover:opacity-80 shadow-violet-200/40 hover:shadow-violet-200/100 p-4 rounded-sm'>
        <GatsbyImage
          alt={images[0]?.altText || title}
          image={images[0]?.gatsbyImageData || storefrontImageData}
          loading={eager ? 'eager' : 'lazy'}
          placeholder='blurred'
          objectFit='contain'
        />
      </div>
    </Link>
  )
}

export default ProductCard

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
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
    }
  }
`
