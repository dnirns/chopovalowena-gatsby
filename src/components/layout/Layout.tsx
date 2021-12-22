import * as React from 'react'
import Nav from './Nav'
import Seo from '../elements/Seo'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Seo />
      <Nav className='uppercase' />
      <main className='pt-20 mx-4 md:mx-8 uppercase'>{children}</main>
    </div>
  )
}

export default Layout
