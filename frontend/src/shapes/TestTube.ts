import { Shape, ShapeInteraction } from '../types'

export class TestTube implements Shape {
  id: string
  x: number
  y: number
  color: string
  private liquidLevel: number
  private width: number
  private height: number
  private rotation: number

  constructor(id: string, x: number, y: number, color: string, liquidLevel: number = 0.5, width: number = 60, height: number = 200, rotation: number = 0) {
    this.id = id
    this.x = x
    this.y = y
    this.color = color
    this.liquidLevel = Math.max(0, Math.min(1, liquidLevel))
    this.width = width
    this.height = height
    this.rotation = rotation
  }

  get interactions(): ShapeInteraction[] {
    return [
      {
        name: 'addLiquid',
        label: 'Add Liquid',
        execute: (shape, params) => {
          const tube = shape as TestTube
          tube.liquidLevel = Math.min(1, tube.liquidLevel + (params?.amount || 0.1))
        }
      },
      {
        name: 'removeLiquid',
        label: 'Remove Liquid',
        execute: (shape, params) => {
          const tube = shape as TestTube
          tube.liquidLevel = Math.max(0, tube.liquidLevel - (params?.amount || 0.1))
        }
      },
      {
        name: 'changeLiquidColor',
        label: 'Change Liquid Color',
        execute: (shape, params) => {
          shape.color = params?.color || shape.color
        }
      },
      {
        name: 'rotateLeft',
        label: 'Rotate Left',
        execute: (shape) => {
          const tube = shape as TestTube
          tube.rotation -= Math.PI / 12 // 15 degrees
        }
      },
      {
        name: 'rotateRight',
        label: 'Rotate Right',
        execute: (shape) => {
          const tube = shape as TestTube
          tube.rotation += Math.PI / 12 // 15 degrees
        }
      }
    ]
  }

  draw(ctx: CanvasRenderingContext2D) {
    const tubeX = -this.width / 2
    const tubeY = -this.height / 2
    const tubeRadius = this.width / 2
    const liquidHeight = this.height * this.liquidLevel

    // Helper function to rotate point around center
    const rotatePoint = (px: number, py: number) => {
      const cos = Math.cos(this.rotation)
      const sin = Math.sin(this.rotation)
      return {
        x: px * cos - py * sin + this.x,
        y: px * sin + py * cos + this.y
      }
    }

    // Calculate rotated tube corners and arc center
    const corners = [
      rotatePoint(tubeX, tubeY),
      rotatePoint(tubeX + this.width, tubeY),
      rotatePoint(tubeX + this.width, tubeY + this.height - tubeRadius),
      rotatePoint(tubeX, tubeY + this.height - tubeRadius)
    ]
    
    // Calculate rotated arc center
    const arcCenter = rotatePoint(0, tubeY + this.height - tubeRadius)

    // Draw tube outline
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    
    ctx.beginPath()
    ctx.moveTo(corners[0].x, corners[0].y)
    ctx.lineTo(corners[1].x, corners[1].y)
    ctx.lineTo(corners[2].x, corners[2].y)
    // Draw rotated bottom arc
    ctx.arc(arcCenter.x, arcCenter.y, tubeRadius, this.rotation, Math.PI + this.rotation)
    ctx.lineTo(corners[3].x, corners[3].y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw liquid (horizontal, not rotated)
    if (this.liquidLevel > 0) {
      ctx.save()
      
      // Create clipping path using tube shape
      ctx.beginPath()
      ctx.moveTo(corners[0].x, corners[0].y)
      ctx.lineTo(corners[1].x, corners[1].y)
      ctx.lineTo(corners[2].x, corners[2].y)
      ctx.arc(arcCenter.x, arcCenter.y, tubeRadius, this.rotation, Math.PI + this.rotation)
      ctx.lineTo(corners[3].x, corners[3].y)
      ctx.closePath()
      ctx.clip()
      
      // Fill the intersection (tube ∩ rectangle) with liquid color
      ctx.fillStyle = this.color
      
      // Draw the rectangle that defines the liquid level
      const rectX1 = this.x - this.height / 2
      const rectX2 = this.x + this.height/ 2
      const rectY1 = this.y + tubeY + this.height - liquidHeight  // liquid level
      const rectY2 = this.y + this.height / 2  // y + tubeWidth/2
      
      ctx.fillRect(rectX1, rectY1, rectX2 - rectX1, rectY2 - rectY1)
      
      ctx.restore()
    }

    // Draw opening at top
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(corners[0].x, corners[0].y)
    ctx.lineTo(corners[1].x, corners[1].y)
    ctx.stroke()
  }
}
