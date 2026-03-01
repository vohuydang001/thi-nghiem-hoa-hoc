import { useState } from 'react'
import { Shape } from '../types'

export const useShapes = () => {
  const [shapes, setShapes] = useState<Shape[]>([])

  const moveShape = (id: string, deltaX: number, deltaY: number) => {
    setShapes(prev => prev.map(shape => {
      if (shape.id === id) {
        shape.x += deltaX
        shape.y += deltaY
        return shape
      }
      return shape
    }))
  }

  const addShape = (shape: Shape) => {
    setShapes(prev => {
      const existingShape = prev.find(s => s.id === shape.id)
      if (existingShape) {
        console.warn(`Shape with id '${shape.id}' already exists. Skipping addition.`)
        return prev
      }
      return [...prev, shape]
    })
  }

  const updateShape = (id: string, updates: Partial<Shape>) => {
    setShapes(prev => prev.map(shape => {
      if (shape.id === id) {
        Object.assign(shape, updates)
        return shape
      }
      return shape
    }))
  }

  const removeShape = (id: string) => {
    setShapes(prev => prev.filter(shape => shape.id !== id))
  }

  const executeInteraction = (shapeId: string, interactionName: string, params?: any) => {
    const shape = shapes.find(s => s.id === shapeId)
    if (!shape) {
      console.error(`Shape with id '${shapeId}' not found. Available shapes:`, shapes.map(s => s.id))
      return
    }

    const interaction = shape.interactions.find(i => i.name === interactionName)
    if (!interaction) {
      console.error(`Interaction '${interactionName}' not found for shape '${shapeId}'. Available:`, shape.interactions.map(i => i.name))
      return
    }

    interaction.execute(shape, params)
    updateShape(shapeId, {})  // Force re-render
  }

  const getAvailableInteractions = (shapeId: string) => {
    const shape = shapes.find(s => s.id === shapeId)
    return shape?.interactions || []
  }

  return { shapes, moveShape, addShape, updateShape, removeShape, executeInteraction, getAvailableInteractions }
}
