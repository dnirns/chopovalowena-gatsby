import * as React from 'react'
import Nav from './Nav'
import Seo from '../elements/Seo'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col'>
      <Seo />
      <div className='w-full flex justify-end'>
        <Nav className='uppercase' />
      </div>

      <main className='pt-20 mx-4 md:mx-8 uppercase'>{children}</main>
    </div>
  )
}

export default Layout
