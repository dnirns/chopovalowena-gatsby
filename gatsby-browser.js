import * as React from 'react'
import { StoreProvider } from './src/context/store-context'
import './src/styles/global.css'

console.log(StoreProvider)
export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
