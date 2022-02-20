import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { CloseButton } from '../elements/ToggleButtons'

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
      } transition ease-in-out duration-300 fixed h-screen w-1/2 bg-white z-20 hidden md:flex top-0 left-0 p-6 `}
    >
      <CloseButton
        onClick={toggleSlider}
        className='absolute top-0 left-0 m-4'
      />

      <div
        onClick={nextImage}
        className='h-full w-full flex items-center justify-center'
      >
        <button
          onClick={nextImage}
          className='cursor-pointer text-4xl mr-4 hover:opacity-50'
        >
          -
        </button>

        <GatsbyImage
          objectFit='contain'
          alt={alt}
          image={image}
          className='my-10 max-h-[80vh]'
        />
        <button
          onClick={nextImage}
          className='cursor-pointer text-4xl ml-4 hover:opacity-50'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default GallerySlider
