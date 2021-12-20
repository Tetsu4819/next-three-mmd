import { useEffect, useRef } from 'react'
import {
  SkinnedMesh,
  Scene,
  WebGLRenderer,
  AmbientLight,
  PerspectiveCamera
} from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'

const modelPath = '/ModelData/Sample/Sample.pmx'

export const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>()
  const loader = new MMDLoader()

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })

    loader.load(
      modelPath,
      //onLoad
      (mesh: SkinnedMesh) => {
        console.log(mesh)
        scene.add(mesh)
      },
      //onProgress
      (e: ProgressEvent<EventTarget>) => {
        console.log(Math.round((e.loaded / e.total) * 100) + '%')
      },
      //onError
      (e: ErrorEvent) => {
        console.error(e)
      }
    )

    ambientSetting(scene)
    rendererSetting(renderer)
    cameraSetting(camera)
    render(renderer, scene, camera)
  }, [])

  const ambientSetting = (scene) => {
    const ambient = new AmbientLight(0xeeeeee)
    scene.add(ambient)
  }

  const rendererSetting = (renderer) => {
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xcccccc, 0)
  }

  const cameraSetting = (camera) => {
    camera.position.set(0, 10, 60)
  }

  const render = (renderer, scene, camera) => {
    const frame = () => {
      requestAnimationFrame(frame)
      renderer.clear()
      renderer.render(scene, camera)
    }
    frame()
  }

  return <canvas ref={canvasRef} />
}
0
