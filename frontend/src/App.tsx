import { useShapes } from './hooks/useShapes'
import { Canvas } from './components/Canvas'
import { Rectangle } from './shapes/Rectangle'
import { TestTube } from './shapes/TestTube'
import { useEffect } from 'react'
import './App.css'

function App() {
  const { shapes, addShape, executeInteraction } = useShapes()

  useEffect(() => {
    // Add demo rectangle
    // const rect = new Rectangle('rect1', 200, 300, '#ff0000', 200, 100)
    // addShape(rect)

    // Add demo test tube
    const tube = new TestTube('tube1', 600, 300, '#00ff00', 0.7, 60, 200)
    addShape(tube)
  }, [])

  useEffect(() => {
    console.log('App - Current shapes:', shapes.map(s => s.id))
  }, [shapes])

  return (
    <div id="container">
      <Canvas shapes={shapes} />
      
      {shapes.map(shape => (
        <div key={shape.id} style={{ marginTop: '10px' }}>
          <h4>{shape.id}</h4>
          {shape.id.startsWith('rect') && (
            <>
              <button
                onClick={() => executeInteraction(shape.id, 'moveLeft')}
                style={{ marginRight: '5px' }}
              >
                Move Left
              </button>
              <button
                onClick={() => executeInteraction(shape.id, 'moveRight')}
                style={{ marginRight: '5px' }}
              >
                Move Right
              </button>
            </>
          )}
          {shape.id.startsWith('tube') && (
            <>
              <button
                onClick={() => executeInteraction(shape.id, 'addLiquid')}
                style={{ marginRight: '5px' }}
              >
                Add Liquid
              </button>
              <button
                onClick={() => executeInteraction(shape.id, 'removeLiquid')}
                style={{ marginRight: '5px' }}
              >
                Remove Liquid
              </button>
              <button
                onClick={() => executeInteraction(shape.id, 'changeLiquidColor', { color: '#ff0000' })}
                style={{ marginRight: '5px' }}
              >
                Red Liquid
              </button>
              <button
                onClick={() => executeInteraction(shape.id, 'rotateLeft')}
                style={{ marginRight: '5px' }}
              >
                Rotate Left
              </button>
              <button
                onClick={() => executeInteraction(shape.id, 'rotateRight')}
                style={{ marginRight: '5px' }}
              >
                Rotate Right
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default App
