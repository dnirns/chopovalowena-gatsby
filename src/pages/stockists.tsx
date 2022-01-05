import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

type Stockist = {
  node: {
    id: string
    stores: string[]
    country: string
  }
}

const stockists = ({ data: { stockists } }) => {
  return (
    <Layout>
      <main className='md:w-1/2'>
        <ul className='space-y-6'>
          {stockists.edges.map((country: Stockist) => {
            return (
              <li className=' global-text-sizes' key={country.node.id}>
                <h2 className='underline pb-1'>{country.node.country}</h2>
                <ul className='leading-tight'>
                  {country.node.stores.map((store) => {
                    return <li key={store}>{store}</li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

export default stockists

export const StockistsQuery = graphql`
  query StockistsQuery {
    stockists: allContentfulStockists(sort: { order: ASC, fields: createdAt }) {
      edges {
        node {
          id
          stores
          country
        }
      }
    }
  }
`
