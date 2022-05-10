/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout/Layout'

const Home = ({ data: { page } }: any) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(true)
    setTimeout(() => {
      setOpenMobileMenu(false)
    }, 100)
  }

  return (
    <Layout openMenu={openMobileMenu}>
      <main className='w-full text-center'>
        <div className='md:w-1/2 fixed w-full h-screen left-0 top-0 z-20'>
          <GatsbyImage
            image={page.image.gatsbyImageData}
            alt='Chopova Lowena Campaign Image'
            objectPosition={'50% 0%'}
            objectFit='cover'
            className='h-full'
          />
          <button
            onClick={handleOpenMobileMenu}
            className='md:hidden relative w-full bottom-[50%] text-6xl hover:text-opacity-80 transition duration-200 ease-in-out text-white mix-blend-difference z-30'
          >
            ENTER SITE
          </button>
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
