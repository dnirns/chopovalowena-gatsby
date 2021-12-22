import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../../../components/layout/Layout'

const index = ({ data: { page } }) => {
  return (
    <Layout>
      <p className='text-8xl '>{page.header}</p>
      <div className='grid grid-cols-2 gap-4'>
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
  query CampaignQuery($slug: String) {
    page: contentfulGallery(
      slug: { eq: $slug }
      galleryType: { eq: "Campaign" }
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
