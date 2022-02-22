import React, { useState, useEffect } from 'react'

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
  // const [showOptions, setShowOptions] = useState(false)
  // const [hasSelectedQuantity, setHasSelectedQuantity] = useState(false)

  const handleSelectQuantity = (quantity) => {
    const max = availableQuantities[availableQuantities.length - 1]
    const min = availableQuantities[0]

    if (quantity > max) {
      onChange(max.toString())
    } else if (quantity < min) {
      onChange(min.toString())
    } else {
      onChange(quantity.toString())
    }
    //   setShowOptions(false)
    //   setHasSelectedQuantity(true)
    // }
  }

  console.log(availableQuantities)
  // const handleOpenOptions = () => {
  //   setShowOptions(true)
  //   setHasSelectedQuantity(false)
  // }

  const remainingStock = availableQuantities[availableQuantities.length - 1]

  return (
    <div className='text-lg 2xl:text-xl'>
      <div className='pb-3'>
        {remainingStock === 1 ? (
          <p>ONLY 1 LEFT</p>
        ) : remainingStock > 1 ? (
          <p>{remainingStock} IN STOCK</p>
        ) : (
          'OUT OF STOCK'
        )}
      </div>

      <p
        // onClick={handleOpenOptions}
        className='uppercase'
      >
        {availableQuantities.length ? 'Select Quantity' : 'Out of stock'}
      </p>
      {/* {hasSelectedQuantity && (
        <p className='text-clpink pt-2'>{selectedQuantity}</p>
      )} */}

      <div className='space-x-4 uppercase'>
        <button
          className='text-4xl'
          onClick={() => handleSelectQuantity(Number(selectedQuantity) - 1)}
        >
          -
        </button>
        <span className='text-clpink'>{selectedQuantity}</span>
        <button
          className='text-3xl'
          onClick={() => handleSelectQuantity(Number(selectedQuantity) + 1)}
        >
          +
        </button>
      </div>
      {/* <div>
        {showOptions && (
          <ul className=''>
            {availableQuantities.map((quantity) => (
              <li
                key={quantity}
                className={`${
                  Number(selectedQuantity) === quantity
                    ? 'text-clpink'
                    : 'text-black hover:text-clpink'
                } cursor-pointer pt-2`}
                onClick={() => handleSelectQuantity(quantity)}
              >
                {quantity}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
    // <fieldset className='space-x-4'>
    //   <label className='text-xl lg:text-lg font-light'>Select Quantity</label>
    //   <select
    //     className='pt-2 pb-1  text-clpink text-lg cl-bold  text-center cursor-pointer bg-white border-none appearance-none'
    //     aria-label='Quantity'
    //     onChange={(e) => onChange(e.target.value)}
    //   >
    //     {availableQuantities?.map((value, i) => (
    //       <option className='text-clpink' value={value} key={i}>
    //         {value}
    //       </option>
    //     ))}
    //   </select>
    // </fieldset>
  )
}
export default QuantitySelect
