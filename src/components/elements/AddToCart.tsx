import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/store-context'

type AddToCartProps = {
  variantId: string
  quantity: string | number
  available: boolean
}

const AddToCart = ({
  variantId,
  quantity,
  available,
  ...props
}: AddToCartProps) => {
  const { addVariantToCart, loading } = useContext(StoreContext)

  const addToCart = (e) => {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type='submit'
      className={`${
        available ? 'bg-violet-600 hover:opacity-80' : 'bg-neutral-300'
      }  p-3  text-white text-sm `}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}

export default AddToCart
