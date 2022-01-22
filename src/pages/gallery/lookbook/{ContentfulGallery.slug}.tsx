import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { GalleryQueryType } from '../../../../types'
import Layout from '../../../components/layout/Layout'
import GallerySlider from '../../../components/gallery/GallerySlider'
import Seo from '../../../components/elements/Seo'
import { cycleImages } from '../../../utils/cycleImages'

const index = ({ data: { page } }: GalleryQueryType) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(0)
  const [sliderOpen, setSliderOpen] = useState<boolean>(false)

  const handleImageClick = (index: number) => {
    setSliderOpen(true)
    setSelectedImage(index)
  }

  const handleCycleImages = (increment: number) => {
    return cycleImages(increment, page.images, selectedImage, setSelectedImage)
  }

  return (
    <Layout noMobileMargin>
      <Seo title={`Chopova Lowena ${page?.season} ${page?.galleryType}`} />

      <GallerySlider
        open={sliderOpen}
        image={page?.images[selectedImage].gatsbyImageData}
        toggleSlider={() => setSliderOpen(false)}
        alt={`Chopova Lowena ${page?.season} Look ${selectedImage + 1}`}
        nextImage={() => handleCycleImages(1)}
        previousImage={() => handleCycleImages(-1)}
      />

      <div className='grid md:grid-cols-4 md:gap-5 mx-0'>
        {page?.images.map((image, index) => (
          <div
            className='cursor-pointer hover:opacity-95'
            onClick={() => handleImageClick(index)}
            key={index}
          >
            <GatsbyImage
              objectFit='fill'
              alt={`Chopova Lowena ${page?.season} ${
                page?.galleryType
              } Image #${index + 1}`}
              image={image.gatsbyImageData}
            />
          </div>
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
        file {
          fileName
        }
      }
    }
  }
`
