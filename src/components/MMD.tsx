import { useEffect, useRef } from 'react'
import { createMMDCanvas } from '../lib/three'

export const MMDCanvas = () => {
  const canvasRef = useRef()
  const modelPath = '/ModelData/Sample/Sample.pmx'

  useEffect(() => {
    const canvas = canvasRef.current
    createMMDCanvas(canvas, modelPath)
  }, [])

  return <canvas ref={canvasRef} />
}
