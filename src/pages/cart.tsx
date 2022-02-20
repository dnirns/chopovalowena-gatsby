import React, { useContext } from 'react'
import Layout from '../components/layout/Layout'
import { StoreContext } from '../context/store-context'
import LineItem from '../components/shop/LineItem'

const cart = () => {
  const { checkout, loading } = useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout>
      <div>
        {emptyCart ? (
          <div>
            <h1>Your cart is empty</h1>
          </div>
        ) : (
          <div className='p-2 space-y-8'>
            <h1 className='text-2xl font-bold text-violet-400'>CART</h1>
            <div>
              {checkout.lineItems.map((item) => (
                <LineItem item={item} key={item.id} />
              ))}
            </div>
            <button
              className='bg-violet-400 text-white uppercase px-4 py-2 my-2 hover:opacity-90'
              onClick={handleCheckout}
              disabled={loading}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default cart
