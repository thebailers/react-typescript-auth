import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, getByText } from '@testing-library/react'

import Landing from '../index'

afterEach(cleanup)

test('it renders the landing component with the appropriate H1 heading', () => {
  const { getByText } = render(<Landing />)
  expect(getByText(/Landing/i)).not.toBeNull()
})
