export interface ShapeInteraction {
  name: string
  label: string
  execute: (shape: Shape, params?: any) => void
}

export interface Shape {
  id: string
  x: number
  y: number
  color: string
  draw: (ctx: CanvasRenderingContext2D) => void
  interactions: ShapeInteraction[]
}
