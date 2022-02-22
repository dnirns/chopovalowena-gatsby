/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout/Layout'

const Home = ({ data: { page } }: any) => {
  return (
    <Layout>
      <main className='w-full text-center'>
        <div className='md:w-1/2 w-full h-screen absolute left-0 top-0 z-20'>
          <GatsbyImage
            image={page.image.gatsbyImageData}
            alt='Chopova Lowena Campaign Image'
            objectFit='cover'
            className='h-full'
          />
        </div>
      </main>
    </Layout>
  )
}

export default Home

export const HomePageQuery = graphql`
  query HomePageQuery {
    page: contentfulHomePageImage(
      id: { eq: "b1e39906-b4ae-5d56-af2b-2345daa72732" }
    ) {
      id
      image {
        gatsbyImageData(quality: 100, placeholder: BLURRED)
      }
    }
  }
`
