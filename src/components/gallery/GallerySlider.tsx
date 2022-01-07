import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import XIcon from '../elements/XIcon'

interface GallerySliderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  open: boolean
  alt: string
  toggleSlider: () => void
}

const GallerySlider = ({
  image,
  open,
  alt,
  toggleSlider,
}: GallerySliderProps) => {
  console.log(alt)
  return (
    <div
      className={`${
        !open && '-translate-x-[100%]'
      } transition ease-in-out duration-300 fixed h-screen w-1/2 bg-white z-20 hidden md:flex top-0 left-0 p-6 `}
    >
      <button
        onClick={toggleSlider}
        className=' absolute top-4 hover:opacity-80'
      >
        <XIcon className='w-7 h-7' />
      </button>

      <GatsbyImage
        objectFit='contain'
        alt={alt}
        image={image}
        className='my-10'
      />
    </div>
  )
}

export default GallerySlider
