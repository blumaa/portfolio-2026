import { useState, useEffect, useRef } from 'react'

function StaticEffect() {
  const [dataUrl, setDataUrl] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const generateStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const color = Math.random() > 0.5 ? 255 : 0
        data[i] = color
        data[i + 1] = color
        data[i + 2] = color
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
      setDataUrl(canvas.toDataURL())
    }

    generateStatic()
    const interval = setInterval(generateStatic, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {dataUrl && (
        <image
          href={dataUrl}
          x="0"
          y="0"
          width="100"
          height="100"
          opacity="0.8"
          style={{ imageRendering: 'pixelated' }}
        />
      )}
    </svg>
  )
}

export { StaticEffect }
