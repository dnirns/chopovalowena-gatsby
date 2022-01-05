import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

const about = ({ data: { page } }) => {
  return (
    <Layout>
      <main className='md:w-1/2 text-xl md:text-2xl  text-justify'>
        <p className='mb-4'>{page.edges[0].node.aboutText.aboutText}</p>
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
