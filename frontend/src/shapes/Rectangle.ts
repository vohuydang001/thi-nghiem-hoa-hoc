import { Shape, ShapeInteraction } from '../types'

export class Rectangle implements Shape {
  id: string
  x: number
  y: number
  color: string
  private width: number
  private height: number

  constructor(id: string, x: number, y: number, color: string, width: number = 100, height: number = 50) {
    this.id = id
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
  }

  get interactions(): ShapeInteraction[] {
    return [
      {
        name: 'moveRight',
        label: 'Move Right',
        execute: (shape, params) => {
          shape.x += params?.distance || 20
        }
      },
      {
        name: 'moveLeft',
        label: 'Move Left',
        execute: (shape, params) => {
          shape.x -= params?.distance || 20
        }
      },
      {
        name: 'changeColor',
        label: 'Change Color',
        execute: (shape, params) => {
          shape.color = params?.color || '#000'
        }
      }
    ]
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height)
  }
}
