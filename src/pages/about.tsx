import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

const about = ({ data: { page } }) => {
  console.log(page.edges[0])
  return (
    <Layout>
      <p className='text-2xl mb-4'>{page.edges[0].node.aboutText.aboutText}</p>
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
