import React, { useContext } from 'react'
import { StoreContext } from '../../context/store-context'
import Slider from '../layout/Slider'
import LineItem from '../../components/products/LineItem'

interface CartSliderProps {
  toggleSlider: () => void
  cartOpen: boolean
}

const CartSlider = ({ cartOpen, toggleSlider }: CartSliderProps) => {
  const { checkout, loading } = useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  return (
    <Slider open={cartOpen} toggleSlider={toggleSlider} desktopOnly={false}>
      <main className='h-full w-full mt-10'>
        {emptyCart ? (
          <div className='h-full w-full flex  justify-center items-center pb-20'>
            <h1 className='uppercase text-3xl text-clred'>
              Your cart is empty
            </h1>
          </div>
        ) : (
          <div className='pt-4 space-y-8 h-full flex flex-col'>
            <h1 className='text-4xl font-bold uppercase text-center'>CART</h1>
            <div>
              {checkout.lineItems.map((item) => (
                <LineItem item={item} key={item.id} />
              ))}
            </div>
            <button
              className='bg-clpink text-white uppercase px-4 pt-3 pb-2 my-2 hover:bg-opacity-60 transition duration-200'
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
