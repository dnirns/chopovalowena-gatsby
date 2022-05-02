import React, { useEffect } from 'react'

const useOutsideClick = (ref: any, callback: any): void => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick

// allows click away / outside click from elements in react components, ie closing menus etc

// import to component
// assign ref to element (useRef)

// use as such:

// useOutsideClick(ref, () => setMenuOpen(false))
