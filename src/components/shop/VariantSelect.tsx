/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface VariantSelectProps {
  options: any[]
  variants: any[]
  onSelect: (e: string) => void
  selectedVariant: string
}
const VariantSelect = ({
  options,
  variants,
  onSelect,
  selectedVariant,
}: VariantSelectProps) => {
  const getHasStock = (value) =>
    variants.find(
      (variant) => variant.title === value && variant.availableForSale
    )
      ? true
      : false

  return (
    <fieldset className='space-x-4 flex my-4 items-center'>
      <label className='text-xl lg:text-lg 2xl:text-xl font-light'>
        Select Size
      </label>
      {options.map(({ id, name, values }) => (
        <div key={id} className='flex'>
          {values.map((value) => {
            const inStock = getHasStock(value)
            return (
              <button
                onClick={() => onSelect(value)}
                className={`${
                  !inStock ? 'text-stone-400 line-through' : 'hover:text-clpink'
                } ${
                  selectedVariant === value && 'text-clpink'
                } px-2 2xl:text-xl`}
                value={value}
                key={`${name}-${value}`}
                disabled={!inStock}
              >
                {value}
              </button>
            )
          })}
        </div>
      ))}
    </fieldset>
  )
}

export default VariantSelect
