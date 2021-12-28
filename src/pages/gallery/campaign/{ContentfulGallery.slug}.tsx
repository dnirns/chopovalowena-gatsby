import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { GalleryQueryType } from '../../../../types'
import Layout from '../../../components/layout/Layout'
import Seo from '../../../components/elements/Seo'

const index = ({ data: { page } }: GalleryQueryType) => {
  return (
    <Layout>
      <Seo title={`Chopova Lowena ${page.season} ${page.galleryType}`} />
      <p className='text-8xl '>{page.header}</p>
      <div className='grid grid-cols-2 gap-4'>
        {page.images.map((image, index) => (
          <GatsbyImage
            key={index}
            objectFit='fill'
            alt={` Chopova Lowena ${page.season} ${page.galleryType} image #${
              index + 1
            }`}
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
