export function parseAccentColor(): { r: number; g: number; b: number } {
  const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim() || '#4a235a'
  return {
    r: parseInt(accentColor.slice(1, 3), 16),
    g: parseInt(accentColor.slice(3, 5), 16),
    b: parseInt(accentColor.slice(5, 7), 16),
  }
}
