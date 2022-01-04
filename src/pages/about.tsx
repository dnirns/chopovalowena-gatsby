import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

const about = ({ data: { page } }) => {
  console.log(page.edges[0])
  return (
    <Layout>
      <main className='md:w-1/2'>
        <p className='text-2xl mb-4'>
          {page.edges[0].node.aboutText.aboutText}
        </p>
      </main>
    </Layout>
  )
}

export default about

export const AboutQuery = graphql`
  query AboutQuery {
    page: allContentfulAboutPage {
      edges {
        node {
          aboutText {
            aboutText
          }
        }
      }
    }
  }
`
