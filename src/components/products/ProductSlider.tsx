import React, { useState, useContext, useEffect, useCallback } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StoreContext } from '../../context/store-context'
import { ProductType } from '../../../types'
import QuantitySelect from '../../components/elements/QuantitySelect'
import VariantSelect from './VariantSelect'
import AddToCart from '../../components/elements/AddToCart'
import { CloseButton } from '../elements/ToggleButtons'
import { cycleImages } from '../../utils/cycleImages'

interface ProductSliderProps {
  product: ProductType | null
  showSlider: boolean
  closeSlider: () => void
}

const ProductSlider = ({
  product,
  showSlider,
  closeSlider,
}: ProductSliderProps) => {
  const {
    variants,
    images,
    options,
    title,
    description,
    images: [firstImage],
  } = product

  // ===== Context ===== //
  const { client } = useContext(StoreContext)

  // ====== State ====== //
  const availableVariants = variants.filter(
    (variant) => variant.availableForSale
  )

  const [variant, setVariant] = useState({ ...availableVariants[0] })

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const availableQuantities = Array.from(
    Array(variant.inventoryQuantity).keys()
  ).map((i) => i + 1)

  // ====== Functions ====== //

  // Change Variants
  const handleOptionChange = (value) => {
    if (value === '') {
      return
    }
    const selectedVariant = variants.find((variant) => variant.title === value)
    setVariant({ ...selectedVariant })
  }

  // Get Availability of Product
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

  useEffect(() => {
    checkAvailablity(product.storefrontId)
    variant.availableForSale ? setQuantity(1) : setQuantity(0)
  }, [
    productVariant.storefrontId,
    checkAvailablity,
    product.storefrontId,
    variant,
  ])

  const handleCycleImages = (increment: number) => {
    return cycleImages(increment, images, selectedImage, setSelectedImage)
  }

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0

  return (
    <section
      className={`${
        !showSlider ? 'translate-x-[-100%]' : 'translate-x-[0]'
      } fixed top-0 left-0 z-20 h-screen w-full md:w-1/2 bg-white transition duration-300 overflow-auto no-scrollbar`}
    >
      {/* ==== IMAGE CAROUSEL ===== */}
      <div
        className='w-full flex items-center justify-center hover:opacity-90 cursor-pointer pt-16 px-2'
        onClick={() => handleCycleImages(1)}
      >
        <CloseButton onClick={closeSlider} className='absolute top-0 left-0' />

        {hasImages && (
          <GatsbyImage
            key={images[selectedImage]?.id}
            image={images[selectedImage]?.gatsbyImageData}
            alt={title}
          />
        )}
      </div>

      {/* ===== ADD TO CART BUTTON ===== */}
      <AddToCart
        variantId={productVariant.storefrontId}
        quantity={quantity}
        available={available}
      />

      {/* ===== INFO ===== */}

      <div className='grid grid-cols-4 gap-2 px-2 '>
        {/* ===== first column span 1 */}
        <div className='col-span-1'>
          <h4 className='md:text-sm md:leading-relaxed'>{title}</h4>
        </div>
        {/* ==== middle column span 2 */}
        <ProductText description={description} />

        {/* ===== right column span 1 - price */}

        <div>
          <h4 className='md:text-sm md:leading-relaxed'>
            {productVariant.price}
          </h4>
        </div>
      </div>

      {/* ==== SELECT VARIANT (SIZE) ====  */}
      {hasVariants && (
        <VariantSelect
          options={options}
          onChange={(e) => handleOptionChange(e)}
          variants={variants}
        />
      )}

      {/* ==== SELECT QUANTITY =====  */}
      <QuantitySelect
        onChange={(value: any) => setQuantity(value)}
        selectedQuantity={quantity}
        availableQuantities={availableQuantities}
      />

      {product.title}
    </section>
  )
}

export default ProductSlider

// eslint-disable-next-line react/prop-types
const ProductText = ({ description }) => {
  return (
    <section className='space-y-4 col-span-2 col-start-2'>
      <h4 className='md:text-sm'>PRODUCT DETAILS</h4>
      <p className='cl-light text-sm'>{description}</p>

      <h4 className='md:text-sm'>SHIPPING</h4>
      <p className='cl-light text-sm'>
        Shipping to the UK, EU, USA and Canada only. Shipping is calculated at
        the checkout. Customs and Duties Not Included.
      </p>

      <h4 className='md:text-sm'>CUSTOMER CARE</h4>
      <p className='cl-light text-sm'>
        Please note some items are made from upcycled, vintage and deadstock
        textiles and leather. Please be aware imperfections may be present. This
        is the beauty of sustainability! Please be aware some buckles can
        scratch the leather. Please take care when trying on our skirts. Any
        skirts with damages are non-returnable. Leather will soften over time.
        Natural leather belts on certain styles will become darker when exposed
        to light. Please see care labels for compositions and care information
        or email eshop@chopovalowena.com for more information.
      </p>
    </section>
  )
}
