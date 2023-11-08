"use client"
import { gsap } from "common/utils/gsap"
import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { SceneManager } from "./scene-manager"
import { initEngine, getRenderer } from "./init"

export default function ThreeScene() {
  const containerRef = useRef(null)

  const [sceneManager, setSceneManager] = useState(null)

  const onSceneLoaded = () => {
    // gsap.to(sceneManager?.mainShape.rotation, { duration: 20, y: Math.PI * 2, repeat: -1, ease: "none" });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (containerRef.current?.hasChildNodes()) {
        return
      }

      const initSceneManager = async () => {
        const sceneManager = new SceneManager()
        await initEngine(containerRef.current)

        await sceneManager.init()
        sceneManager.start()

        const renderer = getRenderer()
        containerRef.current.appendChild(renderer.domElement)

        setSceneManager(sceneManager)
        onSceneLoaded()
      }

      initSceneManager()
    }
  }, [])

  return <div className="scene" id="scene" ref={containerRef}></div>
}
