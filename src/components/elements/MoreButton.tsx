import React from 'react'

import { Link } from 'gatsby'

interface MoreButtonProps {
  className?: string
  linkTo?: string
}

const MoreButton = ({ linkTo, className, ...props }: MoreButtonProps) => {
  return <Link to={linkTo} className={className} {...props} />
}

export default MoreButton
