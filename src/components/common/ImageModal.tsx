import React from 'react'
import { GatsbyImageProps, GatsbyImage } from 'gatsby-plugin-image'
import useOutsideClick from '../../hooks/useOutsideClick'
interface ImageModalProps {
  image: any
  open: boolean
}
const ImageModal = ({ image, open }: ImageModalProps) => {
  return (
    <div className='fixed h-screen w-screen top-0 left-0 z-40 bg-white bg-opacity-90 p-24'>
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.title}
        objectFit='contain'
        className='h-full w-full'
      />
    </div>
  )
}

export default ImageModal
