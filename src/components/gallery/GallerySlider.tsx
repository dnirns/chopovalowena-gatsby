import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { CloseButton } from '../elements/ToggleButtons'
import Arrow from '../elements/Arrow'

interface GallerySliderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  open: boolean
  alt: string
  toggleSlider: () => void
  nextImage: () => void
  previousImage: () => void
}

const GallerySlider = ({
  image,
  open,
  alt,
  toggleSlider,
  nextImage,
  previousImage,
}: GallerySliderProps) => {
  return (
    <div
      className={`${
        !open && '-translate-x-[100%]'
      } transition ease-in-out duration-300 fixed h-screen w-1/2 bg-white z-20 hidden md:flex top-0 left-0 p-3`}
    >
      <CloseButton
        onClick={toggleSlider}
        className='absolute top-0 left-0 m-4'
      />

      <div className='h-full w-full flex items-center justify-between '>
        <Arrow
          className='h-16 w-16 pl-2 rotate-180 flex cursor-pointer hover:opacity-60 transition duration-150'
          onClick={previousImage}
        />

        <GatsbyImage
          objectFit='contain'
          alt={alt}
          image={image}
          className='my-10 max-h-[80vh]'
        />
        <Arrow
          className='h-16 w-16 pl-2 flex cursor-pointer hover:opacity-60 transition duration-150'
          onClick={nextImage}
        />
      </div>
    </div>
  )
}

export default GallerySlider
