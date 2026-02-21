import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TypingText } from './TypingText'

describe('TypingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first phrase initially', () => {
    const phrases = ['Hello World', 'Test Phrase']
    render(<TypingText phrases={phrases} />)

    // Should start typing the first phrase
    act(() => {
      vi.advanceTimersByTime(100) // Advance past first character typing
    })
    expect(screen.getByTestId('typing-text')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const phrases = ['Hello']
    render(<TypingText phrases={phrases} className="custom-class" />)

    const container = screen.getByTestId('typing-text')
    expect(container.className).toContain('custom-class')
  })

  it('shows the cursor element', () => {
    const phrases = ['Hello']
    render(<TypingText phrases={phrases} />)

    expect(screen.getByTestId('typing-cursor')).toBeInTheDocument()
  })
})
