import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
  let changeHandler: ((e: { matches: boolean }) => void) | null

  beforeEach(() => {
    changeHandler = null
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn((_event: string, handler: (e: { matches: boolean }) => void) => {
        changeHandler = handler
      }),
      removeEventListener: vi.fn(),
    })))
  })

  it('returns false when query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('returns true when query matches', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('updates when media query fires change event', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)

    act(() => {
      changeHandler?.({ matches: true })
    })

    expect(result.current).toBe(true)
  })
})
