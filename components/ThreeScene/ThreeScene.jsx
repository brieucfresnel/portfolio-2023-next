"use client";

import React, { useState, useRef, useEffect } from "react";
import { SceneManager } from "./scene-manager";
import { initEngine, getRenderer } from "./init";

export default function ThreeScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (containerRef.current?.hasChildNodes()) {
        return;
      }

      const initSceneManager = async () => {
        console.log("init()");
        const sceneManager = new SceneManager();
        await initEngine(containerRef.current);

        await sceneManager.init();
        sceneManager.start();

        const renderer = getRenderer();
        containerRef.current.appendChild(renderer.domElement);
      };

      initSceneManager();
    }
  }, []);

  return <div className="scene" id="scene" ref={containerRef}></div>;
}
