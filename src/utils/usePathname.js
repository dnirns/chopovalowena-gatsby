import { useLocation } from '@reach/router'

export const usePathname = () => {
  const { pathname } = useLocation()

  return pathname.replace('/', '')
}
