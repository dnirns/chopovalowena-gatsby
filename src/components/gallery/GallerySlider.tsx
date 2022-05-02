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
  onClick: () => void
}

const GallerySlider = ({
  image,
  open,
  alt,
  toggleSlider,
  nextImage,
  previousImage,
  onClick,
}: GallerySliderProps) => {
  return (
    <div
      className={`${
        !open && '-translate-x-[100%]'
      } transition ease-in-out duration-300 fixed h-screen w-1/2 bg-white z-20 hidden md:flex top-0 left-0 p-3`}
    >
      <CloseButton
        onClick={toggleSlider}
        className='absolute top-0 left-0 m-4 h-[32px] w-[32px] md:h-6 md:w-6'
      />

      <div className='h-full  flex items-center justify-between '>
        <Arrow
          className='h-7 md:h-6 w-7 md:w-6 mx-2 rotate-180 flex hover:opacity-60 cursor-pointer'
          onClick={previousImage}
        />

        <div
          onClick={onClick}
          className='cursor-zoom-in image-hover mx-1 flex-1'
        >
          <GatsbyImage
            objectFit='contain'
            alt={alt}
            image={image}
            className='my-10 max-h-[80vh]'
          />
        </div>

        <Arrow
          className='h-7 md:h-6 w-7 md:w-6 mx-2 hover:opacity-60 flex cursor-pointer'
          onClick={nextImage}
        />
      </div>
    </div>
  )
}

export default GallerySlider
