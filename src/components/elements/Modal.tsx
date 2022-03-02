import React, { useRef, useState, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import useOutsideClick from '../../hooks/useOutsideClick'

interface ModalProps {
  handleToggle: () => void
  image: any
}
const Modal = ({ image, handleToggle }: ModalProps) => {
  const ref = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 20)
  }, [])

  useOutsideClick(ref, () => {
    // set state to close to trigger animation, then run function to close modal
    // timeout is used to allow animation to complete, set to same duration as animation
    setIsOpen(false)
    setTimeout(() => {
      handleToggle()
    }, 200)
  })

  return (
    <div
      className={`${
        isOpen ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200 ease-in-out z-40 fixed top-0 left-0 h-screen w-screen bg-white bg-opacity-90 flex items-center justify-center cursor-pointer`}
    >
      {image && (
        <div
          ref={ref}
          className='h-auto w-auto cursor-default border-2 border-black p-4 bg-white'
        >
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.title}
            className='h-full w-full max-h-screen'
            objectFit='contain'
          />
        </div>
      )}
    </div>
  )
}

export default Modal
