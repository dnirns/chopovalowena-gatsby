import React from 'react'

interface QuantitySelectProps {
  availableQuantities: number[]
  onChange: (value: string) => void
}

const QuantitySelect = ({
  availableQuantities,
  onChange,
}: QuantitySelectProps) => {
  return (
    <fieldset>
      <div>
        <select
          className='cl-bold p-2 rounded-sm bg-violet-400 text-white text-sm  font-light font-san-serif'
          aria-label='Quantity'
          onChange={(e) => onChange(e.target.value)}
        >
          <option className='cl-bold' value=''>
            Select Quantity
          </option>
          {availableQuantities.map((value, i) => (
            <option className='cl-bold' value={value} key={i}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  )
}
export default QuantitySelect
