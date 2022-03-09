/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BLOCKS } from '@contentful/rich-text-types'
import { renderBareRichText } from '../contentful/RichText'
import useOutsideClick from '../../hooks/useOutsideClick'
import { CloseButton } from '../elements/ToggleButtons'

interface ModalProps {
  toggleModal: () => void
  cycleImage?: (num: number) => void | (() => void)
  image?: any
  responsiveImage?: {
    desktop?: any
    mobile?: any
  }
  hasMultiple?: boolean
  text?: any
}
const Modal = ({
  image,
  responsiveImage,
  toggleModal,
  cycleImage,
  hasMultiple,
  text,
}: ModalProps) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [allowToggle, setAllowToggle] = useState(true)

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
      }, 150)
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
      } transition ease-in-out duration-150 z-40 fixed top-0 left-0 h-screen w-screen flex bg-white/80  px-4 md:px-8 `}
    >
      <CloseButton
        onClick={handleToggleModal}
        className='fixed md:hidden top-4 left-4 h-[30px] w-[30px]'
      />
      <div
        ref={ref}
        onClick={cycleImage ? handleCycleImages : null}
        className={`bg-white w-[75vh] mx-auto my-auto shadow-2xl z-50 p-3 border-2 border-black overflow-y-auto h-[75vh]`}
      >
        {text && (
          <div className='p-4 md:p-12 cursor-default text-justify space-y-6 normal-case overflow-auto '>
            <h1 className='text-3xl text-center uppercase pb-6'>
              {text.title}
            </h1>
            {renderBareRichText(text.body.raw, {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
                  <p className=''>{children}</p>
                ),
                [BLOCKS.HEADING_4]: (_node: any, children: any) => (
                  <h4 className='text-lg text-center'>{children}</h4>
                ),
              },
            })}
          </div>
        )}
        {image && (
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.title}
            objectFit='contain'
            className={`${
              hasMultiple ? 'arrow-cursor' : 'cursor-default'
            } w-full h-full inline-flex top-0 left-0 `}
          />
        )}
        {responsiveImage && (
          <>
            {responsiveImage.desktop && (
              <GatsbyImage
                image={responsiveImage.desktop.gatsbyImageData}
                alt={responsiveImage.desktop.title}
                objectFit='contain'
                className='hidden cursor-default w-full h-full md:inline-flex top-0 left-0'
              />
            )}
            {responsiveImage.mobile && (
              <GatsbyImage
                image={responsiveImage.mobile.gatsbyImageData}
                alt={responsiveImage.mobile.title}
                objectFit='contain'
                className='md:hidden cursor-default w-full h-full inline-flex top-0 left-0'
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
