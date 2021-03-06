import React from 'react'
import Arrow from '../elements/Arrow'

interface QuantitySelectProps {
  availableQuantities: number[]
  onChange: (value: string) => void
  selectedQuantity?: number
}

const QuantitySelect = ({
  availableQuantities,
  selectedQuantity,
  onChange,
}: QuantitySelectProps) => {
  // const max = availableQuantities[availableQuantities.length - 1]
  const remainingStock = availableQuantities[availableQuantities.length - 1]
  const min = availableQuantities[0]

  const handleSelectQuantity = (quantity) => {
    if (availableQuantities.length > 1) {
      if (quantity > remainingStock) {
        onChange(remainingStock.toString())
      } else if (quantity < min) {
        onChange(min.toString())
      } else {
        onChange(quantity.toString())
      }
    }
  }

  return (
    <div className='text-xl md:text-base 2xl:text-xl uppercase'>
      <div className='pb-4'>
        {remainingStock === 1 ? (
          <p>ONLY 1 LEFT</p>
        ) : remainingStock > 1 ? (
          <p>{remainingStock} IN STOCK</p>
        ) : (
          'OUT OF STOCK'
        )}
      </div>

      <div className='flex items-center space-x-3 md:space-x-2'>
        <p>
          {availableQuantities.length ? 'Quantity selected' : 'Out of stock'}
        </p>
        <div className='space-x-4 md:space-x-2 flex items-center'>
          <span className='text-clpink md:font-bold'>{selectedQuantity}</span>

          {remainingStock > 1 && (
            <div className='flex pb-1 space-x-6 md:space-x-2 items-center justify-center'>
              <Arrow
                onClick={() =>
                  handleSelectQuantity(Number(selectedQuantity) - 1)
                }
                className={`${
                  selectedQuantity <= min
                    ? 'cursor-not-allowed opacity-20'
                    : 'cursor-pointer hover:opacity-40'
                }
          rotate-90 h-5 w-5 md:h-3 md:w-3`}
              />

              <Arrow
                onClick={() =>
                  handleSelectQuantity(Number(selectedQuantity) + 1)
                }
                className={`${
                  selectedQuantity >= remainingStock
                    ? 'cursor-not-allowed opacity-20'
                    : 'cursor-pointer hover:opacity-40'
                }
          -rotate-90 h-5 w-5 md:h-3 md:w-3`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default QuantitySelect
