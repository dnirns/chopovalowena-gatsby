import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../../components/layout/Layout'
import ProductListing from '../../../components/shop/ProductListing'
import Seo from '../../../components/elements/Seo'
import { ProductType } from '../../../../types'

import { MobileCategoriesNav } from '../index'

interface ProductIndexProps {
  data: {
    products: { nodes: ProductType[] }
  }
  pageContext: {
    productType: string
  }
}

const ProductTypeIndex = ({
  data: { products },
  pageContext: { productType },
}: ProductIndexProps) => {
  return (
    <Layout>
      <Seo title={`Category: ${productType}`} />
      <MobileCategoriesNav />

      {products.nodes.length > 0 ? (
        <ProductListing products={products.nodes} />
      ) : (
        <div>
          <p>Sorry, we are sold out of {productType}</p>
        </div>
      )}
    </Layout>
  )
}

export default ProductTypeIndex

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType }, totalInventory: { gt: 0 } }
      sort: { fields: publishedAt, order: ASC }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
