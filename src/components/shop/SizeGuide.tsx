import React, { useRef } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Modal from '../elements/Modal'

interface SizeGuideProps {
  className?: string
  isOpen: boolean
  close: () => void
}
const SizeGuide = ({ className, isOpen, close }: SizeGuideProps) => {
  const { data } = useStaticQuery(graphql`
    query {
      data: allContentfulSizeGuides {
        edges {
          node {
            mobileImage {
              gatsbyImageData(placeholder: BLURRED, width: 400, quality: 80)
              title
            }
            desktopImage {
              title
              gatsbyImageData(placeholder: BLURRED, width: 800, quality: 80)
            }
          }
        }
      }
    }
  `)

  const sizeGuides = data.edges[0].node

  return (
    <div className='cursor-default'>
      <div
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0'
        } transition ease-in-out duration-500 block md:hidden bg-white border-2 border-black p-2 `}
      >
        <GatsbyImage
          className='w-full h-full'
          image={sizeGuides.mobileImage.gatsbyImageData}
          alt={sizeGuides.mobileImage.title}
        />
      </div>
      <div className='hidden md:block bg-white border-2 border-black mx-8 p-2'>
        <GatsbyImage
          className='w-full h-full'
          image={sizeGuides.desktopImage.gatsbyImageData}
          alt={sizeGuides.desktopImage.title}
        />
      </div>
    </div>
  )
}

export default SizeGuide
