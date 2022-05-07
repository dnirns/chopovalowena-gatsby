import React from 'react'
import { graphql, Link } from 'gatsby'
import { ProductType } from '../../../types'
import Seo from '../../components/elements/Seo'
import Layout from '../../components/layout/Layout'
import ProductListing from '../../components/shop/ProductListing'
import { ShopNavCategories } from '../../components/layout/ShopNav'
interface ProductsProps {
  data: {
    products: {
      nodes: ProductType[]
    }
  }
}

export const MobileCategoriesNav = () => {
  return (
    <div className='md:hidden flex flex-col space-y-0 leading-none text-[1.7rem] translate-y-[-38px]'>
      <ShopNavCategories />
      <Link
        key='All'
        className='hover:text-clyellow'
        to='/products'
        activeClassName='text-clyellow'
      >
        All
      </Link>
    </div>
  )
}
const Products = ({ data: { products } }: ProductsProps) => {
  return (
    <Layout>
      <Seo
        title='All Products'
        description='Chopova Lowena E-Store - All Products'
      />
      <MobileCategoriesNav />
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
