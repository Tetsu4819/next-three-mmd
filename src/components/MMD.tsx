import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  PerspectiveCamera,
  Scene,
  SkinnedMesh,
  WebGLRenderer
} from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'

export const MMDCanvas = () => {
  const modelPath = '/ModelData/Sample/Sample.pmx'
  const canvasRef = useRef()

  const LoadModel = (modelPath: string, scene: Scene) => {
    const mmdLoader = new MMDLoader()

    const onLoad = (mesh: SkinnedMesh) => {
      scene.add(mesh)
    }

    const onProgress = (e: ProgressEvent<EventTarget>) => {
      console.log(Math.round((e.loaded / e.total) * 100) + '%')
    }

    const onError = (e: ErrorEvent) => {
      console.log(e)
    }

    //load mmd file
    mmdLoader.load(modelPath, onLoad, onProgress, onError)
  }

  const createScene = (canvas: HTMLCanvasElement) => {
    // create scene
    const scene = new Scene()
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })

    // light setting
    const ambient = new AmbientLight(0xeeeeee)
    scene.add(ambient)

    // display setting
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xcccccc, 0)

    // Camera setting
    const camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.set(0, 10, 60)
    LoadModel(modelPath, scene)

    const render = () => {
      requestAnimationFrame(render)
      renderer.clear()
      renderer.render(scene, camera)
    }

    render()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    createScene(canvas)
  }, [])

  return <canvas ref={canvasRef} />
}
