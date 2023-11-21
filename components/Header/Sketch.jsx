import * as React from "react"

import dynamic from "next/dynamic"

const ReactP5Wrapper = dynamic(
  () =>
    import("@p5-wrapper/react").then((module) => ({
      default: module.ReactP5Wrapper,
    })),
  {
    ssr: false,
  }
)

function sketch(p5) {
  const canvas = document.querySelector("#sketch-container")
  let canvasRect, width, height

  let particles = []
  const num = 800
  let noiseScale = 0.035
  let directionX = 1
  let directionY = -1

  let state = {
    isSketchPaused: null,
  }

  p5.updateWithProps = (props) => {
    state = Object.assign(state, props)
  }

  const calculateCanvasSize = () => {
    canvasRect = canvas.getBoundingClientRect()
    width = canvasRect.width
    height = canvasRect.height
  }

  window.addEventListener("resize", () => {
    calculateCanvasSize()
    p5.resizeCanvas(width, height)
  })

  calculateCanvasSize()

  function makeParticles() {
    const particles = []
    for (let i = 0; i < num; i++) {
      particles.push(p5.createVector(p5.random(width), p5.random(height)))
    }
    return particles
  }

  function setup(p5) {
    return () => {
      p5.pixelDensity(1)
      p5.createCanvas(width, height, p5.P2D)

      particles = makeParticles()
      // For a cool effect try uncommenting this line
      // And comment out the background() line in draw
      p5.stroke(255, 220, 226, 20)
      p5.clear()
    }
  }

  function draw(p5, props) {
    return () => {
      if (props.isSketchPaused === true) return

      // Loop
      for (let i = 0; i < num; i++) {
        let p = particles[i]
        p5.point(p.x, p.y)
        let n = p5.noise(
          p.x * noiseScale,
          p.y * noiseScale,
          p5.frameCount * noiseScale * noiseScale
        )

        let a = p5.TAU * n
        p.x += p5.cos(a) * directionX
        p.y += p5.sin(a) * directionY

        p = checkBoundaries(p)

        if (!onScreen(p)) {
          p.x = p5.random(width)
          p.y = p5.random(height)
        }
      }
    }
  }

  p5.draw = draw(p5, state)
  p5.setup = setup(p5)

  window.addEventListener("click", (e) => {
    if (e.pageX > canvasRect.x && e.pageY < canvasRect.y + canvasRect.height) {
      p5.noiseSeed(p5.random(1000))
      noiseScale -= 0.01 * p5.random([-1, 1])
      // directionX = p5.random([-1, 1])
      directionY = -directionY
      // p5.clear()
    }
  })

  const checkBoundaries = (p) => {
    if (p.x > width) {
      p.x = 0
    } else if (p.x < 0) {
      p.x = width
    }

    if (p.y > height) {
      p.y = 0
    } else if (p.y < 0) {
      p.y = height
    }

    return p
  }

  function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height
  }
}

export function Sketch({ isSketchPaused }) {
  return (
    <React.Suspense fallback={<div>...</div>}>
      <ReactP5Wrapper sketch={sketch} isSketchPaused={isSketchPaused} />
    </React.Suspense>
  )
}
