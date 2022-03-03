import { GatsbyImage } from 'gatsby-plugin-image'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { graphql } from 'gatsby'

import { ProductType, VariantType } from '../../../types'
import { StoreContext } from '../../context/store-context'
import useOutsideClick from '../../hooks/useOutsideClick'
import { cycleImages } from '../../utils/cycleImages'
import AddToCart from '../elements/AddToCart'
import Arrow from '../elements/Arrow'
import { CloseButton } from '../elements/ToggleButtons'
import QuantitySelect from '../shop/QuantitySelect'
import SizeGuide from '../shop/SizeGuide'
import VariantSelect from '../shop/VariantSelect'
import ImageModal from '../common/ImageModal'
import Modal from '../elements/Modal'

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

  const hasOneSize =
    options.length === 1 && options[0].values[0].toLowerCase() === 'one size'

  // ===== Context ===== //
  const { client, didJustAddToCart } = useContext(StoreContext)

  // ====== State ====== //
  const availableVariants = variants.filter(
    (variant) => variant.availableForSale
  )

  const defaultVariant = availableVariants[0]

  const [variant, setVariant] = useState<VariantType>(defaultVariant)

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

  // ===== Set the first available variant as the default on loading ===== //
  useEffect(() => {
    setVariant(defaultVariant)
  }, [defaultVariant])

  useEffect(() => {
    checkAvailablity(product.storefrontId)
    variant.availableForSale ? setQuantity(1) : setQuantity(0)
  }, [
    productVariant.storefrontId,
    checkAvailablity,
    product.storefrontId,
    variant,
  ])

  // close slider when product is added to cart
  useEffect(() => {
    if (didJustAddToCart) {
      closeSlider()
    }
  }, [didJustAddToCart])

  // when different product is selected, change the selected image to first
  useEffect(() => {
    setSelectedImage(0)
  }, [product])

  const handleCycleImages = (increment: number) => {
    return cycleImages(increment, images, selectedImage, setSelectedImage)
  }

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const sizeGuideRef = useRef(null)
  const imageModalRef = useRef(null)

  // close popup modal with click outside event listener hook
  useOutsideClick(sizeGuideRef, () => {
    setSizeGuideOpen(false)
  })
  useOutsideClick(imageModalRef, () => {
    setImageModalOpen(false)
  })

  const handleOpenSizeGuide = () => {
    setTimeout(() => {
      setSizeGuideOpen(true)
    }, 10)
  }

  const handleCloseSizeGuide = () => {
    setSizeGuideOpen(false)
  }

  const handleToggleImageModal = () => {
    setTimeout(() => {
      setImageModalOpen(!imageModalOpen)
    }, 10)
  }

  const hasVariants = variants.length > 0
  const hasImages = images.length > 0

  return (
    <>
      {sizeGuideOpen && (
        <div className='h-full w-full fixed bg-white bg-opacity-80 top-0 left-0 z-40 flex items-center justify-center cross-cursor'>
          <div ref={sizeGuideRef}>
            <SizeGuide isOpen={sizeGuideOpen} close={handleCloseSizeGuide} />
          </div>
        </div>
      )}

      {imageModalOpen && (
        <Modal
          image={images[selectedImage]}
          toggleModal={handleToggleImageModal}
          cycleImage={(num) => handleCycleImages(num)}
          multipleImages={images.length > 1}
        />
      )}

      <section
        className={`${
          !showSlider ? 'translate-x-[-100%]' : 'translate-x-[0]'
        } fixed top-0 left-0 z-30 h-full w-full md:w-1/2 bg-white transition duration-300 overflow-auto no-scrollbar`}
      >
        <CloseButton
          onClick={closeSlider}
          className={`sticky z-40 top-4 left-4 h-[30px] w-[30px] md:h-5 md:w-5`}
        />
        {/* ==== IMAGE CAROUSEL ===== */}
        {hasImages && (
          <div
            className={`${
              images.length > 1 ? 'justify-between' : 'justify-center'
            } w-full flex items-center hover:opacity-90 cursor-pointer px-2`}
          >
            {images.length > 1 && (
              <Arrow
                className='h-6 w-6 mx-2 rotate-180 flex hover:opacity-60'
                onClick={() => handleCycleImages(1)}
              />
            )}

            <div onClick={handleToggleImageModal}>
              <GatsbyImage
                className='mx-1 max-w-[500px] cursor-zoom-in'
                key={images[selectedImage]?.id}
                image={images[selectedImage]?.gatsbyImageData}
                alt={title}
              />
            </div>
            {images.length > 1 && (
              <Arrow
                className='h-6 w-6 mx-2 hover:opacity-60 flex'
                onClick={() => handleCycleImages(-1)}
              />
            )}
          </div>
        )}

        {/* ===== ADD TO CART BUTTON ===== */}
        <AddToCart
          variantId={productVariant.storefrontId}
          quantity={quantity}
          available={available}
        />

        {/* ===== INFO ===== */}

        <div className='grid grid-cols-3 md:grid-cols-2 gap-4 px-4'>
          {/* ===== first column span 1 */}
          <div className='col-span-2 md:col-span-1'>
            <h4 className='md:text-base text-xl  2xl:text-xl'>{title}</h4>
          </div>

          <div className='col-span-1 block md:hidden'>
            <h4 className='text-lg text-right'>£ {productVariant.price}</h4>
            <p
              onClick={handleOpenSizeGuide}
              className='text-right py-2  cursor-pointer hover:opacity-60 transition duration-150'
            >
              SIZE GUIDE
            </p>
          </div>

          <div className='flex flex-col'>
            <h4 className='hidden md:block md:text-base 2xl:text-xl text-right'>
              £{''} {productVariant.price}
            </h4>
            <p
              onClick={handleOpenSizeGuide}
              className='text-right hidden md:inline-block cursor-pointer hover:opacity-60 transition duration-150 col-start-2 col-span-1'
            >
              SIZE GUIDE
            </p>
          </div>

          {/* ==== middle column span 2 */}
          <ProductText description={description} />

          {/* ===== right column span 1 - price */}
        </div>

        <div className='p-4'>
          {/* ==== SELECT VARIANT (SIZE) ====  */}
          {hasVariants &&
            !hasOneSize &&
            variant.title.toLowerCase() !== 'default title' && (
              <VariantSelect
                options={options}
                onSelect={(e) => handleOptionChange(e)}
                variants={variants}
                selectedVariant={variant.title}
              />
            )}

          {hasOneSize && <p className='text-lg py-2'>One Size Only</p>}

          {/* ==== SELECT QUANTITY =====  */}
          <QuantitySelect
            onChange={(value: any) => setQuantity(value)}
            selectedQuantity={quantity}
            availableQuantities={availableQuantities}
          />
        </div>
      </section>
    </>
  )
}

export default ProductSlider

// export const query = graphql`
//   query ($productType: String!) {
//     product: shopifyProduct(
//       filter: { productType: { eq: $productType }, totalInventory: { gt: 0 } }
//       sort: { fields: publishedAt, order: ASC }
//     ) {
//       nodes {
//         ...ProductCard
//       }
//       pageInfo {
//         hasNextPage
//       }
//     }
//   }
// `

// eslint-disable-next-line react/prop-types
const ProductText = ({ description }) => {
  return (
    <section className='space-y-4 col-span-3 md:col-span-2 md:col-start-1'>
      <h4 className='text-xl md:text-base 2xl:text-xl'>PRODUCT DETAILS</h4>
      <p className='cl-light text-sm 2xl:text-base'>{description}</p>

      <h4 className='text-xl md:text-base 2xl:text-xl'>SHIPPING</h4>
      <p className='cl-light text-sm 2xl:text-base'>
        Shipping to the UK, EU, USA and Canada only. Shipping is calculated at
        the checkout. Customs and Duties Not Included.
      </p>

      <h4 className='text-xl md:text-base 2xl:text-xl'>CUSTOMER CARE</h4>
      <p className='cl-light text-sm 2xl:text-base'>
        Please note some items are made from upcycled, vintage and deadstock
        textiles and leather. Please be aware imperfections may be present. This
        is the beauty of sustainability! Please be aware some buckles can
        scratch the leather. Please take care when trying on our skirts. Any
        skirts with damages are non-returnable. Leather will soften over time.
        Natural leather belts on certain styles will become darker when exposed
        to light. Please see care labels for compositions and care information
        or email{' '}
        <a
          className='hover:text-clblue transition duration-75'
          href='mailto:eshop@chopovalowena.com'
          target='_blank'
          rel='noreferrer'
        >
          eshop@chopovalowena.com
        </a>{' '}
        for more information.
      </p>
    </section>
  )
}
