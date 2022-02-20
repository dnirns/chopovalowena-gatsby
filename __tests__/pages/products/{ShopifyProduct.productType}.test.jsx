import React from 'react'
import renderer from 'react-test-renderer'
import ProductTypeIndex from '../../../src/pages/products/{ShopifyProduct.productType}/index'

describe('Product Category Page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductTypeIndex />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
