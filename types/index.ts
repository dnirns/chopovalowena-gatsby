/* eslint-disable @typescript-eslint/no-explicit-any */
// Shopify Types

export type LineItemType = {
  id: string
  quantity: number
  title: string
  variant: VariantType
}

export type VariantType = {
  available: boolean
  id: string
  price: number
  priceV2: {
    amount: number
  }
  title: string
  image: {
    id: number
    src: string
    height: number
    altText: string
  }
  availableForSale: boolean
  inventoryQuantity: number
}

export type ProductType = {
  id: string
  title: string
  tags: string[]
  handle: string
  totalInventory: number
  priceRangeV2: {
    minVariantPrice: {
      amount: number
      currencyCode: string
    }
  }
  description: string
  variants: VariantType[]
  images: any[]
  options: any // change this
  storefrontId: string
  productType: string
  productTypeSlug: string
}

// General Types

export type GalleryType = {
  node: {
    id: string
    slug: string
    season: string
    galleryType: string
    header: string
  }
}

export type GalleryQueryType = {
  data: {
    page: {
      id: string
      slug: string
      season: string
      galleryType: string
      header: string
      images: {
        gatsbyImageData
        file: {
          fileName: string
        }
      }[]
      credits?: string[]
    }
  }
}
