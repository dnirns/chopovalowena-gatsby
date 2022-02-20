import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout/Layout'
import ProductListing from '../../components/shop/ProductListing'
import Seo from '../../components/elements/Seo'
import { ProductType } from '../../../types'

interface ProductsProps {
  data: {
    products: {
      nodes: ProductType[]
    }
  }
}
const Products = ({ data: { products } }: ProductsProps) => {
  return (
    <Layout>
      <Seo
        title='All Products'
        description='Chopova Lowena E-Store - All Products'
      />
      <ProductListing products={products.nodes} />
    </Layout>
  )
}

export default Products

export const query = graphql`
  {
    products: allShopifyProduct(
      filter: { totalInventory: { gt: 0 } }
      sort: { fields: publishedAt, order: ASC } # limit: 24
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
