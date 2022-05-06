import { useLocation } from '@reach/router'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useState, useRef, useContext } from 'react'

import useOutsideClick from '../../hooks/useOutsideClick'

import { GalleryType } from '../../../types'

import { StoreContext } from '../../context/store-context'

interface GalleryNavProps {
  title: string
  toggleNav?: () => void
}

const GalleryNav = ({ title, toggleNav }: GalleryNavProps) => {
  const { allContentfulGallery } = useStaticQuery(graphql`
    query {
      allContentfulGallery(sort: { fields: slug, order: DESC }) {
        edges {
          node {
            id
            slug
            season
            galleryType
            header
          }
        }
      }
    }
  `)
  const galleries = allContentfulGallery.edges

  const [navOpen, setNavOpen] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState('')
  const [collectionsOpen, setCollectionsOpen] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)

  useOutsideClick(navRef, () => setNavOpen(false))

  const { isMobileNavOpen } = useContext(StoreContext)

  const reducedSeasons = galleries.reduce(
    (acc: GalleryType, curr: GalleryType) => {
      if (!acc[curr.node.season]) {
        acc[curr.node.season] = []
      }
      acc[curr.node.season].push(curr.node)
      return acc
    },
    {}
  )

  const location = useLocation()

  const handleClickTitle = () => {
    setNavOpen(!navOpen)
    setCollectionsOpen(!collectionsOpen)
  }

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase  '>
      <div
        ref={navRef}
        onMouseLeave={() => setNavOpen(false)}
        className='relative w-full h-full flex flex-col text-left '
      >
        <button
          className={`${
            location.pathname.includes('gallery') &&
            !isMobileNavOpen &&
            'text-clpink'
          } ${
            navOpen && 'text-clpink'
          }  uppercase text-left hover:text-clpink  `}
          onClick={handleClickTitle}
        >
          {title}
        </button>
        <div
          className={`${navOpen ? 'block' : 'hidden'} ${
            isMobileNavOpen && 'pl-2'
          } flex flex-col relative pt-0 bg-none left-0 space-y-1 md:-translate-y-1 xl:-translate-y-[.4rem]`}
        >
          {Object.keys(reducedSeasons).map((season, i) => {
            return (
              <ul key={i} className='flex flex-col leading-none '>
                <li
                  onClick={() => setSelectedSeason(season)}
                  className={`${
                    season === selectedSeason && 'text-clpink'
                  } hover:text-clpink cursor-pointer hover`}
                >
                  {season}
                </li>
                <ul className='leading-none'>
                  {reducedSeasons[season].map((gallery, i) => {
                    return (
                      <li key={i}>
                        <Link
                          to={`/gallery/${gallery.galleryType.toLowerCase()}/${
                            gallery.slug
                          }`}
                          className={`${
                            gallery.season === selectedSeason
                              ? 'block'
                              : 'hidden'
                          } px-2 pt-1 hover:text-clpink  `}
                          onClick={toggleNav}
                        >
                          {gallery.galleryType}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </ul>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default GalleryNav
