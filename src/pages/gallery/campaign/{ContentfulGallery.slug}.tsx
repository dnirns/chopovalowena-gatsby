import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { GalleryQueryType } from '../../../../types'
import Layout from '../../../components/layout/Layout'
import Seo from '../../../components/elements/Seo'

const index = ({ data: { page } }: GalleryQueryType) => {
  return (
    <Layout noMargin={true}>
      <Seo title={`Chopova Lowena ${page?.season} ${page?.galleryType}`} />

      <main className='md:w-1/2 z-20 md:absolute top-0'>
        {page?.images.map((image, index) => (
          <GatsbyImage
            className='col-span-1 col-start-1'
            key={index}
            objectFit='fill'
            alt={` Chopova Lowena ${page?.season} ${page?.galleryType} image #${
              index + 1
            }`}
            image={image.gatsbyImageData}
          />
        ))}

        <ul className='text-xl md:text-2xl space-y-0 leading-tight m-4'>
          {page?.credits &&
            page?.credits.map((credit: string, i: number) => (
              <li key={i}>{credit}</li>
            ))}
        </ul>
      </main>
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
      credits
    }
  }
`
