/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import useOutsideClick from '../../hooks/useOutsideClick'
import { CloseButton } from '../elements/ToggleButtons'

interface ModalProps {
  toggleModal: () => void
  cycleImage?: (num: number) => void | (() => void)
  image: any
  multipleImages?: boolean
}
const Modal = ({
  image,
  toggleModal,
  cycleImage,
  multipleImages,
}: ModalProps) => {
  const ref = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [allowToggle, setAllowToggle] = useState(true)

  console.log(multipleImages)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 20)
  }, [toggleModal])

  const handleToggleModal = () => {
    if (allowToggle) {
      // set state to trigger animation, then run function to close modal
      // timeout allows animation to complete, set to same duration as transition
      setIsOpen(false)
      setTimeout(() => {
        toggleModal()
      }, 300)
    }
  }

  useOutsideClick(ref, () => {
    handleToggleModal()
  })

  const handleCycleImages = (): void => {
    // disallow outside click before cycling images to avoid closing modal
    setAllowToggle(false)
    cycleImage(1)
    // once image is cycled, allow outside click again after 10ms delay
    setTimeout(() => {
      setAllowToggle(true)
    }, 10)
  }

  return (
    <div
      className={`${
        isOpen ? 'opacity-100 cross-cursor' : 'opacity-0 cursor-default'
      } transition ease-in-out duration-300 z-40 fixed top-0 left-0 h-screen w-screen flex bg-white  px-8 `}
    >
      <CloseButton
        onClick={handleToggleModal}
        className='fixed md:hidden top-4 left-4 h-8 w-8'
      />
      <div
        ref={ref}
        onClick={handleCycleImages ? handleCycleImages : null}
        className={`bg-white w-[75vh] mx-auto my-auto shadow-2xl z-40 p-3 `}
      >
        <GatsbyImage
          image={image.gatsbyImageData}
          alt={image.title}
          objectFit='contain'
          className={`${
            multipleImages ? 'arrow-cursor' : 'cursor-default'
          } w-full h-full inline-flex top-0 left-0 `}
        />
      </div>
    </div>
  )
}

export default Modal
