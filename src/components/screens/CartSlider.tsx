import React, { useContext } from 'react'
import { StoreContext } from '../../context/store-context'
import Slider from '../layout/Slider'
import LineItem from '../shop/LineItem'

interface CartSliderProps {
  toggleSlider: () => void
  cartOpen: boolean
}

const CartSlider = ({ cartOpen, toggleSlider }: CartSliderProps) => {
  const { checkout, loading } = useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
    toggleSlider()
  }
  return (
    <Slider open={cartOpen} toggleSlider={toggleSlider} desktopOnly={false}>
      <main className='mt-10 h-full w-full'>
        {emptyCart ? (
          <div className='flex h-full w-full items-center justify-center pb-20'>
            <h1
              className='
             text-3xl uppercase'
            >
              cart is empty
            </h1>
          </div>
        ) : (
          <div className=' flex h-full flex-col space-y-8 pt-4'>
            <h1 className='text-center text-4xl font-bold uppercase'>CART</h1>
            <div>
              {checkout.lineItems.map((item) => (
                <LineItem item={item} key={item.id} />
              ))}
            </div>
            <button
              className='my-2 bg-clpink px-4 pt-3 pb-2 text-xl uppercase text-white transition duration-200 hover:bg-opacity-60'
              onClick={handleCheckout}
              disabled={loading}
            >
              Checkout
            </button>
          </div>
        )}
      </main>
    </Slider>
  )
}

export default CartSlider
