/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, createContext, ReactChild } from 'react'
import Client from 'shopify-buy'
import { LineItemType } from '../../types'

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  }
  // fetch
)

interface Context {
  isMobileNavOpen: boolean
  toggleMobileNav: () => void
  checkout: {
    id: string
    lineItems: LineItemType[]
    webUrl?: string
  }
  cart: any[]
  cartQuantity: number
  isCartOpen: boolean
  toggleCart: () => void
  loading: boolean
  onOpen: () => void
  onClose: () => void
  addVariantToCart: (variantId: string, quantity: string | number) => void
  removeLineItem: (checkoutID: string, lineItemID: string) => void
  updateLineItem: (
    checkoutID: string,
    lineItemID: string,
    quantity: number
  ) => void
  client: any
  didJustAddToCart: boolean
}

//  Default Context
const defaultValues: Context = {
  isMobileNavOpen: false,
  toggleMobileNav: () => {},

  cart: [],
  cartQuantity: 0,
  isCartOpen: false,
  toggleCart: () => {},
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    id: null,
    lineItems: [],
  },
  didJustAddToCart: false,
}

// Create Context with default values
export const StoreContext = createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
// key for localStorage
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }: any) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [loading, setLoading] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }
    setCheckout(checkout)
  }

  // create new / retrieve current checkout from localStorage
  useEffect(() => {
    const initialiseCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }
      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initialiseCheckout()
  }, [])

  const addVariantToCart = (variantId: string, quantity: string | number) => {
    setLoading(true)
    const checkoutID = checkout.id
    const lineItemsToUpdate = [
      {
        variantId,
        //@ts-ignore
        quantity: parseInt(quantity, 10),
      },
    ]

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 3000) // update cart state after 1 second
      })
  }

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true)
    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const toggleCart = (): void => {
    setIsCartOpen(!isCartOpen)
  }

  // number of cart items - to display in nav / cart icon
  const cartQuantity = checkout.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const toggleMobileNav = (): void => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart: addedToCart,
        isCartOpen,
        toggleCart,
        cartQuantity,
        isMobileNavOpen,
        toggleMobileNav,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
