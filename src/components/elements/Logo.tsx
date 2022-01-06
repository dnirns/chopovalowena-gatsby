import React from 'react'
import { Link } from 'gatsby'

interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to='/' className={`${className}`}>
      <svg
        enableBackground='new 0 0 451.4 45.8'
        viewBox='0 0 451.4 45.8'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m19.4 16.2c0-6.4-.7-9.3-4.2-9.3-4.1 0-4.5 3.9-4.5 15.5 0 13.1.4 16.5 4.7 16.5 3.8 0 4.3-4.4 4.3-11.2h10v1.5c0 9.5-2.7 16.6-15.5 16.6-13.2 0-14.2-10-14.2-23.2 0-11.3.6-22.6 15.3-22.6 9.1 0 14.1 3.9 14.1 14.3v1.9z' />
        <path d='m33.5.9h10.4v16.5h8.3v-16.5h10.4v44h-10.4v-18.8h-8.3v18.8h-10.4z' />
        <path d='m81.3 45.8c-13.6 0-15.5-8.9-15.5-22.9s1.8-22.9 15.5-22.9c14.7 0 15.5 10.7 15.5 22.9s-.8 22.9-15.5 22.9zm-.1-6.9c4.2 0 4.8-3.9 4.8-16s-.6-16-4.8-16c-4.1 0-4.7 3.9-4.7 16s.6 16 4.7 16z' />
        <path d='m128.7 44.9h-10.4v-17.2h-4.6c-10.4 0-14.1-5.6-14.1-13.4 0-5.5 2.1-13.4 13-13.4h16v44zm-10.4-36.4h-2.7c-4.2 0-5.3 2.6-5.3 6 0 3 1 5.6 5.1 5.6h2.8v-11.6z' />
        <path d='m147.4 45.8c-13.6 0-15.5-8.9-15.5-22.9s1.9-22.9 15.5-22.9c14.7 0 15.5 10.7 15.5 22.9s-.8 22.9-15.5 22.9zm-.1-6.9c4.2 0 4.8-3.9 4.8-16s-.6-16-4.8-16c-4.1 0-4.7 3.9-4.7 16s.7 16 4.7 16z' />
        <path d='m163 .9h11.1l5.2 34h.1l5.3-34h11.1l-10 44h-13.2z' />
        <path d='m202 .9h13l11 44h-10.7l-1.6-8.4h-10.7l-1.5 8.4h-10.7zm6.3 8h-.1l-3.6 19.6h7.5z' />
        <path d='m244.7.9h10.3v35.6h15v8.4h-25.3z' />
        <path d='m287.3 45.8c-13.6 0-15.5-8.9-15.5-22.9s1.9-22.9 15.5-22.9c14.7 0 15.5 10.7 15.5 22.9s-.8 22.9-15.5 22.9zm0-6.9c4.2 0 4.8-3.9 4.8-16s-.6-16-4.8-16c-4.1 0-4.7 3.9-4.7 16s.6 16 4.7 16z' />
        <path d='m303.5.9h10.4l3.8 31.3h.1l4.6-31.3h9.6l4.9 31.3h.1l3.7-31.3h10l-7.6 44h-11.5l-4.5-31.3h-.1l-4.3 31.3h-11.5z' />
        <path d='m379.4 44.9h-26.2v-8.4h15.8v-10h-14.2v-8.4h14.2v-8.8h-15.1v-8.4h25.5z' />
        <path d='m383.4.9h11.9l8.5 28.6h.1v-28.6h9.6v44h-11.7l-9.1-30.3h-.1v30.3h-9.3v-44z' />
        <path d='m440.2 44.9h-13l-11-44h10.8l1.6 8.4h10.5l1.5-8.4h10.7zm-6.3-8h.1l3.6-19.6h-7.5z' />
      </svg>
    </Link>
  )
}

export default Logo