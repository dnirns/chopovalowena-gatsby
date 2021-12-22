import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../../../components/layout/Layout'

const index = ({ data: { page } }) => {
  return (
    <Layout>
      <p className='text-5xl mb-4'>{page.header}</p>
      <div className='grid grid-cols-3 gap-4'>
        {page.images.map((image, index) => (
          <GatsbyImage
            key={index}
            objectFit='fill'
            alt={`Product Image of ${page.header} #${index + 1}`}
            image={image.gatsbyImageData}
          />
        ))}
      </div>
    </Layout>
  )
}

export default index

export const GalleryQuery = graphql`
  query LookbookQuery($slug: String) {
    page: contentfulGallery(
      slug: { eq: $slug }
      galleryType: { eq: "Lookbook" }
    ) {
      id
      slug
      season
      galleryType
      header
      images {
        gatsbyImageData
      }
    }
  }
`
