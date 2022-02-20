import React, { useState } from 'react'

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
  const [showOptions, setShowOptions] = useState(false)
  const [hasSelectedQuantity, setHasSelectedQuantity] = useState(false)

  const handleSelectQuantity = (quantity) => {
    onChange(quantity.toString())
    setShowOptions(false)
    setHasSelectedQuantity(true)
  }

  const handleOpenOptions = () => {
    setShowOptions(true)
    setHasSelectedQuantity(false)
  }

  return (
    <div className='text-lg'>
      <button
        onClick={handleOpenOptions}
        className='uppercase hover:text-clpink'
      >
        {availableQuantities.length ? 'Select Quantity' : 'Out of stock'}
      </button>
      {hasSelectedQuantity && <p>{selectedQuantity}</p>}
      <div>
        {showOptions && (
          <ul className=''>
            {availableQuantities.map((quantity) => (
              <li
                key={quantity}
                className={`${
                  Number(selectedQuantity) === quantity
                    ? 'text-clpink'
                    : 'text-black hover:text-clpink'
                } p-2 cursor-pointer`}
                onClick={() => handleSelectQuantity(quantity)}
              >
                {quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
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
