import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  pathname?: string
  article?: boolean
  children?: React.ReactNode
}

const Seo = ({
  title = '',
  description = '',
  pathname = '',
  image = '',
  children = null,
}: SeoProps) => {
  const location = useLocation()

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteUrl
          hrefLang
          siteDescription
          siteImage
          twitter
        }
      }
    }
  `)

  const {
    siteTitle,
    siteTitleDefault,
    siteUrl,
    siteDescription,
    siteImage,
    hrefLang,
    twitter,
  } = siteMetadata

  const seoData = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : location.href,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <Helmet
      title={title}
      defaultTitle={siteTitleDefault}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <html lang={hrefLang} />
      <meta name='description' content={seoData.description} />
      <meta name='image' content={seoData.image} />
      <meta property='og:title' content={seoData.title} />
      <meta property='og:url' content={seoData.url} />
      <meta property='og:description' content={seoData.description} />
      <meta property='og:image' content={seoData.image} />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seoData.title} />
      <meta name='twitter:url' content={seoData.url} />
      <meta name='twitter:description' content={seoData.description} />
      <meta name='twitter:image' content={seoData.image} />
      <meta name='twitter:creator' content={twitter} />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />

      {children}
    </Helmet>
  )
}

export default Seo
