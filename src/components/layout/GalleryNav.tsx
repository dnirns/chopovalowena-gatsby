import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { GalleryType } from '../../../types'

interface GalleryNavProps {
  title: string
}

const GalleryNav = ({ title }: GalleryNavProps) => {
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

  // get array of galleries with matching season keys
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

  return (
    <nav className='flex flex-col flex-wrap relative h-auto uppercase space-y-4'>
      <div className='relative w-full h-full flex flex-col text-left'>
        <button
          className='uppercase text-left hover:text-blue-500'
          onClick={() => setNavOpen(true)}
        >
          {title}
        </button>
        <div
          className={`${
            navOpen ? 'block' : 'hidden'
          } flex flex-col relative pt-2 bg-white left-0  space-y-1 `}
          onMouseLeave={() => setNavOpen(false)}
        >
          {Object.keys(reducedSeasons).map((season, i) => {
            return (
              <ul key={i} className='flex flex-col leading-none'>
                <li
                  onClick={() => setSelectedSeason(season)}
                  className={`${
                    season === selectedSeason && 'text-blue-500'
                  } hover:text-blue-500 hover:cursor-pointer hover`}
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
                          } px-2 py-1 hover:text-blue-500 `}
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
