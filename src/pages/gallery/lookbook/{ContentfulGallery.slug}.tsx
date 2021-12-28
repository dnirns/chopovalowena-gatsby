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
      <h1 className='text-5xl mb-4'>{page.header}</h1>
      <div className='grid grid-cols-3 gap-4'>
        {page.images.map((image, index) => (
          <GatsbyImage
            key={index}
            objectFit='fill'
            alt={`Chopova Lowena ${page.season} ${page.galleryType} Image #${
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
