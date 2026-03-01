import { useEffect, useRef } from 'react'
import { Shape } from '../types'

interface CanvasProps {
  shapes: Shape[]
}

export const Canvas = ({ shapes }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shapes.forEach(shape => shape.draw(ctx))
  }, [shapes])

  return (
    <canvas 
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid black' }}
    />
  )
}
