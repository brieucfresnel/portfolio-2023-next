import * as React from "react"

import "./sketch.scss"
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
  const width = window.innerWidth
  const height = window.innerHeight

  let particles = []
  const num = 1000

  const noiseScale = 0.03

  p5.setup = () => {
    p5.pixelDensity(1)
    p5.createCanvas(width, height, p5.WEBGL)
    for (let i = 0; i < num; i++) {
      particles.push(p5.createVector(p5.random(width), p5.random(height)))
    }

    // For a cool effect try uncommenting this line
    // And comment out the background() line in draw
    p5.stroke(255, 220, 226, 50)
    p5.strokeWeight(0.9)
    p5.clear()
  }

  p5.draw = () => {
    // p5.background(0, 10)
    p5.translate(-width / 2, -height / 2)

    for (let i = 0; i < num; i++) {
      let p = particles[i]
      p5.point(p.x, p.y)
      let n = p5.noise(
        p.x * noiseScale,
        p.y * noiseScale,
        p5.frameCount * noiseScale * noiseScale
      )

      let a = p5.TAU * n
      p.x += p5.cos(a)
      p.y += p5.sin(a)

      if (!onScreen(p)) {
        p.x = p5.random(width)
        p.y = p5.random(height)
      }
    }
  }

  p5.mouseReleased = () => {
    p5.noiseSeed(p5.millis())
  }

  function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height
  }
}

export function Sketch() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ReactP5Wrapper sketch={sketch} />
    </React.Suspense>
  )
}
