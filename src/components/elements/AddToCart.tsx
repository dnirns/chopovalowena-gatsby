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

  const disabled = !available || !variantId || !quantity || loading

  return (
    <button
      type='submit'
      className={`${
        !disabled ? 'bg-clpink hover:bg-opacity-80' : 'bg-violet-200'
      }  pt-3 pb-2ga px-2  text-white text-lg md:text-lg w-full uppercase my-12 `}
      onClick={addToCart}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <span className='ml-2'>Loading...</span>
      ) : available ? (
        'Add to Cart'
      ) : (
        'Out of Stock'
      )}
    </button>
  )
}

export default AddToCart
