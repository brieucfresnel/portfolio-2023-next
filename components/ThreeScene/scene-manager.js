import * as THREE from "three";
import "./ThreeScene.scss";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

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
    // this.scene.background = new THREE.TextureLoader().load(
    //   "images/bg-gradient-noise.png"
    // );
    this.renderer = getRenderer();
    this.camera = getCamera();
    this.gui = getGui();
    const { width, height } = getRenderSize();
    this.width = width;
    this.height = height;
    this.showHelpers = false;
    this.shapeVariant = 1;
    this.addBg = false;
    // this.fontLoader = new FontLoader();

    this.enableBloom = false;

    let cameraDistance = 15;
    this.camera.position.z = cameraDistance;

    this.MOTION_BLUR_AMOUNT = 0.5;
  };

  this.start = () => {
    this.addMainShape();
    this.makeMainTitle();
    // this.createCubeBg();
    this.addLights();

    let cameraDistance = 16;
    this.camera.position.z = cameraDistance;
    this.dirLight1.position.set(3, 6, 0);
    this.dirLight2.position.set(-3, 12, 0);
    this.mainShape.translateX(7.5);

    this.mainTitleMesh.translateX(7.5);

    if (this.enableBloom) {
      this.makeBloomComposer();
    }

    if (this.showHelpers) this.makeHelpers();

    this.applyPostProcessing();

    getTick(({ timestamp, timeDiff }) => {
      const time = timestamp / 10000;
      this.mainShape.material.userData.shader.uniforms.uTime.value = time;
      this.mainShape.rotateY(0.001);
      // this.backgroundSphere.rotateX(0.1);
      // if (this.addBg) {
      //   this.mainShapeBg.material.userData.shader.uniforms.uTime.value = time;
      // }
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

  this.makeMainTitle = (font) => {
    const titleGeometry = new TextGeometry("Brieuc\nFresnel", {
      height: 0.1,
      size: 0.3,
      font: font,
    });

    const titleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      // emissive: 0xffffff,
      // emissiveIntensity: 0.1,
    });

    this.mainTitleMesh = new THREE.Mesh(titleGeometry, titleMaterial);

    this.scene.add(this.mainTitleMesh);
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
    if (this.shapeVariant === 1) {
      this.mainShape = new ShapeVariant1(this.cubeMap);
    }
    if (this.shapeVariant === 2) {
      this.mainShape = new ShapeVariant2();
      // if (this.addBg) {
      // this.mainShapeBg = new ShapeVariant2(true);
      // }
    }

    // this.mainShape.(5, 0, 0);
    const orbit = new THREE.Object3D();
    orbit.rotation.order = "XYZ"; //this is important to keep level, so Z should be the last axis to rotate in order...
    orbit.position.copy(this.mainShape.position);
    // this.scene.add(orbit);

    //offset the camera and add it to the pivot
    //you could adapt the code so that you can 'zoom' by changing the z value in camera.position in a mousewheel event..

    // orbit.add(this.camera);

    var ease = 0.00002;
    let rotEase = 0.01;

    // document.addEventListener("mousemove", (e) => {
    // let rotX, rotY;

    // gsap.to(orbit.rotation, {
    //   duration: 1,
    //   // x: rotX,
    //   // y: rotY,
    //   modifiers: {
    //     x: function (x) {
    //       // return orbit.rotation.y - e.movementX * -ease;
    //     },
    //     y: function (y) {
    //       // return orbit.rotation.x - e.movementY * -ease;
    //     },
    //   },
    //   // z: "+=" + e.movementX * scale,
    // });

    // orbit.rotation.z = 0; //this is important to keep the camera level..
    // });

    //the camera rotation pivot

    this.scene.add(this.mainShape);
    // this.scene.add(this.mainShapeBg);
  };

  this.addLights = () => {
    this.dirLight2 = new THREE.SpotLight(0xffffff, 1.75);

    // this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));

    // this.dirLight1 = new THREE.DirectionalLight("#FFFFFF", 3.4);
    // this.scene.add(this.dirLight1);

    this.dirLight1 = new THREE.DirectionalLight("#FF9DA5", 1.8);
    this.scene.add(this.dirLight1);

    // this.dirLight2 = new THREE.DirectionalLight("#E26770", 0.4);
    // this.dirLight2.position.set(-5, -5, 0);
    // this.scene.add(this.dirLight2);
    // const dirLight2 = new THREE.DirectionalLight('#E26770', 0.6)
    // dirLight2.position.set(0, -15, 2)

    this.ambientLight = new THREE.AmbientLight("#FFFFFF", 0.45);
    this.scene.add(this.ambientLight);
  };

  this.createCubeBg = () => {
    this.backgroundSphere = new THREE.Mesh(
      new THREE.SphereGeometry(20, 10, 10),
      new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("/images/bg-gradient-noise.png"),
        side: THREE.DoubleSide,
      })
    );

    // backgroundSphere.translateX(5);
    // backgroundSphere.translateZ(5);
    this.backgroundSphere.translateX(this.mainShape.position.x);
    this.backgroundSphere.translateY(this.mainShape.position.y);
    this.backgroundSphere.translateZ(this.mainShape.position.z);

    this.scene.add(this.backgroundSphere);

    // const shinyMaterial = new THREE.MeshStandardMaterial({
    //   color: 16777215,
    //   metalness: 1,
    //   roughness: -1,
    //   side: THREE.DoubleSide,
    // });
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

  this.getMainShape = () => {
    return this.mainShape;
  };
}
