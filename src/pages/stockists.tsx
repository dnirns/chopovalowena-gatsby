import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

const stockists = ({ data: { stockists } }) => {
  return (
    <Layout>
      <main className='md:w-1/2'>
        <ul className='space-y-6'>
          {stockists.edges.map((country, i) => {
            return (
              <li className='space-y-2 text-2xl' key={i}>
                <h2 className='underline'>{country.node.country}</h2>
                <ul>
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
