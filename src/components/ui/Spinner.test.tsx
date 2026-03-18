import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role="status"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status')).toBeInTheDocument()
  })

  it('accepts a className override', () => {
    const { getByRole } = render(<Spinner className="custom-class" />)
    const status = getByRole('status')
    expect(status.className).toContain('custom-class')
  })
})
