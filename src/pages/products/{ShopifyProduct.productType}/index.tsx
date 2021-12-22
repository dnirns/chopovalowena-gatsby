import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/layout/Layout'
import ProductListing from '../../../components/products/ProductListing'
import Seo from '../../../components/elements/seo'
import { ProductType } from '../../../../types'

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
      <ProductListing products={products.nodes} />
    </Layout>
  )
}

export default ProductTypeIndex

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: publishedAt, order: ASC }
    ) {
      nodes {
        ...ProductCard
        totalInventory
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
