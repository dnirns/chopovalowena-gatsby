import React, { useState, useEffect, useContext, useCallback } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../../components/layout/Layout'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { StoreContext } from '../../../context/store-context'
import AddToCart from '../../../components/elements/AddToCart'
import { formatPrice } from '../../../utils/format-price'
import Seo from '../../../components/elements/seo'
import QuantitySelect from '../../../components/elements/QuantitySelect'

import { ProductType } from '../../../../types'

interface ProductsProps {
  data: {
    product: ProductType
  }
}

export default function Product({ data: { product } }: ProductsProps) {
  const {
    options,
    variants,
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product

  const { client } = useContext(StoreContext)

  const availableVariants = variants.filter(
    (variant) => variant.availableForSale
  )

  const [variant, setVariant] = useState({ ...availableVariants[0] })

  const [quantity, setQuantity] = useState(1)

  const availableQuantities = Array.from(
    Array(variant.inventoryQuantity).keys()
  ).map((i) => i + 1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (value) => {
    if (value === '') {
      return
    }

    const selectedVariant = variants.find((variant) => variant.title === value)
    setVariant({ ...selectedVariant })
  }

  useEffect(() => {
    checkAvailablity(product.storefrontId)
    variant.availableForSale ? setQuantity(0) : setQuantity(1)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0

  console.log(availableQuantities)
  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className=''>
        <div className=''>
          {hasImages && (
            <div className='grid sm:grid-cols-2 md:grid-cols-3'>
              {images.map((image, index) => (
                <GatsbyImage
                  key={index}
                  objectFit='contain'
                  loading={index === 0 ? 'eager' : 'lazy'}
                  alt={
                    image.altText
                      ? image.altText
                      : `Product Image of ${title} #${index + 1}`
                  }
                  image={image.gatsbyImageData}
                />
              ))}
            </div>
          )}

          <div>
            <div className='space-y-8 my-4'>
              <h1 className='font-semibold text-xl'>{title}</h1>
              <p className='text-sm'>{description}</p>
              <p className='text-sm font-bold'>{price}</p>
            </div>

            <div className='space-y-4 my-4'>
              {/* SELECT VARIANT (SIZE) */}
              {hasVariants && (
                <fieldset className=''>
                  {options.map(({ id, name, values }) => (
                    <div key={id}>
                      <select
                        className={`p-2 rounded-sm bg-violet-400 text-white text-sm  font-light`}
                        aria-label='Variants'
                        onChange={(e) => handleOptionChange(e.target.value)}
                      >
                        <option
                          className='p-2'
                          value=''
                        >{`Select ${name}`}</option>
                        {values.map((value) => (
                          <option
                            className='p-2 border border-red-500'
                            value={value}
                            key={`${name}-${value}`}
                            disabled={
                              !variants.find(
                                (variant) =>
                                  variant.title === value &&
                                  variant.availableForSale
                              )
                            }
                          >
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </fieldset>
              )}
              <div>
                {/* SELECT QUANTITY */}
                {
                  <QuantitySelect
                    onChange={(value: any) => setQuantity(value)}
                    availableQuantities={availableQuantities}
                  />
                }
              </div>
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>

            <Link to={product.productTypeSlug}>
              BACK TO{' '}
              <span className='uppercase font-bold text-violet-500'>
                {product.productType}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  # query ($id: String!, $productType: String!) {
  query ($id: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: BLURRED)
      }
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
    # suggestions: allShopifyProduct(
    #   limit: 3
    #   filter: { productType: { eq: $productType }, id: { ne: $id } }
    # ) {
    #   nodes {
    #     ...ProductCard
    #   }
    # }
  }
`
