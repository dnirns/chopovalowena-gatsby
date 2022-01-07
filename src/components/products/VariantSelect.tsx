/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface VariantSelectProps {
  options: any[]
  variants: any[]
  onChange: (e: string) => void
}
const VariantSelect = ({ options, variants, onChange }: VariantSelectProps) => {
  return (
    <fieldset className='space-x-4 p-2 flex'>
      <label className='text-sm font-light'>Select Size</label>
      {options.map(({ id, name, values }) => (
        <div key={id}>
          <select
            className={`p-2 rounded-sm bg-violet-400 text-white text-sm  font-light`}
            aria-label='Variants'
            onChange={(e) => onChange(e.target.value)}
          >
            {values.map((value) => (
              <option
                className='p-2 border border-red-500'
                value={value}
                key={`${name}-${value}`}
                disabled={
                  !variants.find(
                    (variant) =>
                      variant.title === value && variant.availableForSale
                  )
                }
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </fieldset>
  )
}

export default VariantSelect
