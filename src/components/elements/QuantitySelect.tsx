import React from 'react'

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
  return (
    <fieldset className='space-x-4 p-2'>
      <label className='text-sm font-light'>Select Quantity</label>
      <select
        className='pt-2 pb-1 rounded-sm bg-violet-400 text-white text-sm  font-light font-san-serif text-center cursor-pointer'
        aria-label='Quantity'
        onChange={(e) => onChange(e.target.value)}
      >
        {availableQuantities?.map((value, i) => (
          <option className='font-mono' value={value} key={i}>
            {value}
          </option>
        ))}
      </select>
    </fieldset>
  )
}
export default QuantitySelect
