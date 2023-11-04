import * as THREE from "three";
import "./ThreeScene.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";

import ShapeVariant1 from "./shapes/shape-1";
import ShapeVariant2 from "./shapes/shape-2";

import {
  initEngine,
  getTick,
  getScene,
  getCamera,
  getGui,
  getRenderer,
  getRenderSize,
  addPass,
} from "./init";
// import noiseFS2 from "./shaders/noise-fs-2.glsl";

// import bgGradientNoise from "@/public/images/bg-gradient-noise.png";

export function SceneManager() {
  this.init = async () => {
    this.scene = getScene();
    this.scene.background = new THREE.TextureLoader().load(
      "images/bg-gradient-noise.png"
    );
    this.renderer = getRenderer();
    this.camera = getCamera();
    this.gui = getGui();
    const { width, height } = getRenderSize();
    this.width = width;
    this.height = height;
    this.showHelpers = true;
    // this.fontLoader = new FontLoader();

    // this.enableOrbitControls = true;
    this.enableBloom = false;

    this.camera.position.z = 5;
    this.camera.position.x = 5;

    this.MOTION_BLUR_AMOUNT = 0.5;
  };

  this.start = () => {
    this.addMainShape();
    this.addLights();

    if (this.enableBloom) {
      this.makeBloomComposer();
    }
    if (this.showHelpers) this.makeHelpers();

    if (this.enableOrbitControls) {
      this.addOrbitControls();
    }
    let i = 0;

    this.applyPostProcessing();

    getTick(({ timestamp, timeDiff }) => {
      const time = timestamp / 10000;
      this.mainShape.material.userData.shader.uniforms.uTime.value = time;
    });
  };

  this.applyPostProcessing = () => {
    const renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    };

    // save pass
    const savePass = new SavePass(
      new THREE.WebGLRenderTarget(
        this.width,
        this.height,
        renderTargetParameters
      )
    );
    // blend pass
    const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
    blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
    blendPass.uniforms["mixRatio"].value = this.MOTION_BLUR_AMOUNT;

    // output pass
    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = true;

    // adding passes to composer
    addPass(blendPass);
    addPass(savePass);
    addPass(outputPass);
  };

  this.makeGui = () => {
    const cameraFolder = this.gui.addFolder("Camera");
    cameraFolder.add(this.camera.position, "z", 0, 10);
    cameraFolder.open();
  };

  this.makeBloomComposer = () => {
    const params = {
      exposure: 1,
      bloomStrength: 1,
      bloomThreshold: 0,
      bloomRadius: 0,
    };
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    addPass(bloomPass);
  };

  this.makeHelpers = () => {
    if (this.dirLight1) {
      const dirLight1helper = new THREE.DirectionalLightHelper(this.dirLight1);
      this.scene.add(dirLight1helper);
    }

    if (this.dirLight2) {
      const dirLight2helper = new THREE.DirectionalLightHelper(this.dirLight2);
      this.scene.add(dirLight2helper);
    }

    const gridHelper = new THREE.GridHelper(5, 5);
    this.scene.add(gridHelper);
  };

  this.addMainShape = () => {
    // this.mainShape = makeShapeVariant1(this.cubeMap, this.globalUniforms);
    this.mainShape = new ShapeVariant1(this.cubeMap);

    this.scene.add(this.mainShape);
  };

  this.addLights = () => {
    let light = new THREE.DirectionalLight(0xffffff, 1.75);

    // this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));

    this.dirLight1 = new THREE.DirectionalLight("#222222", 0.4);
    this.dirLight1.position.set(5, 5, 0);
    this.scene.add(this.dirLight1);

    // this.dirLight2 = new THREE.DirectionalLight("#E26770", 0.4);
    // this.dirLight2.position.set(-5, -5, 0);
    // this.scene.add(this.dirLight2);
    // const dirLight2 = new THREE.DirectionalLight('#E26770', 0.6)
    // dirLight2.position.set(0, -15, 2)

    this.ambientLight = new THREE.AmbientLight("#FFFFFF", 0.8);
    this.scene.add(this.ambientLight);
  };

  this.createCubeMap = () => {
    let images = [];

    let c = document.createElement("canvas");
    c.width = 4;
    c.height = c.width;
    let ctx = c.getContext("2d");
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let j = 0; j < (c.width * c.height) / 2; j++) {
        ctx.fillStyle = Math.random() < 0.5 ? "#a8a9ad" : "#646464";
        ctx.fillRect(
          Math.floor(Math.random() * c.width),
          Math.floor(Math.random() * c.height),
          2,
          1
        );
      }

      images.push(c.toDataURL());
    }

    return new THREE.CubeTextureLoader().load(images);
  };
}
