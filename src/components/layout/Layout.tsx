import * as React from 'react'
import Nav from './Nav'
import Seo from '../elements/Seo'

interface LayoutProps {
  children: React.ReactNode
  noMobileMargin?: boolean
}

const Layout = ({ children, noMobileMargin }: LayoutProps) => {
  return (
    <div className='flex flex-col'>
      <Seo />
      <div className='w-full flex justify-end'>
        <Nav className='uppercase' />
      </div>

      <main
        className={`${
          noMobileMargin ? 'mx-0' : 'mx-4'
        } pt-20  md:mx-8 uppercase`}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
