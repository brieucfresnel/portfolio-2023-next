import * as THREE from "three";
import "./ThreeScene.scss";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import noiseFS from "assets/shaders/shape-1/noise-fs.glsl";
import noise3D from "assets/shaders/noise-3D.glsl";
import fragment from "assets/shaders/shape-1/fragment.glsl";
import vertex from "assets/shaders/shape-1/vertex.glsl";
import shape2FragmentMain from "assets/shaders/shape-2/fragment_main.glsl";
import shape2FragmentPars from "assets/shaders/shape-2/fragment_pars.glsl";
import shape2VertexMain from "assets/shaders/shape-2/vertex_main.glsl";
import shape2VertexPars from "assets/shaders/shape-2/vertex_pars.glsl";

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

function makeShapeVariant1(cubeMap, globalUniforms) {
  let g = new THREE.IcosahedronGeometry(1, 70);
  let localUniforms = {
    color1: { value: new THREE.Color(0xdf3838) },
    color2: { value: new THREE.Color(444296) },
  };

  let m = new THREE.MeshStandardMaterial({
    roughness: 0.125,
    metalness: 0.875,
    envMap: cubeMap,
    onBeforeCompile: (shader) => {
      shader.uniforms.bloom = globalUniforms.bloom;
      shader.uniforms.color1 = localUniforms.color1;
      shader.uniforms.color2 = localUniforms.color2;
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `
        uniform float time;
        varying vec3 rPos;
        ${noiseFS}
        float noise(vec3 p){
          return cnoise(vec4(p, time));
        }
        vec3 getPos(vec3 p){
          return p * (4. + noise(p * 3.) * 3.);
        }
        ${shader.vertexShader}
      `
        .replace(
          `#include <beginnormal_vertex>`,
          `#include <beginnormal_vertex>
        
          vec3 p0 = getPos(position);
          
          // https://stackoverflow.com/a/39296939/4045502
          
          float theta = .1; 
          vec3 vecTangent = normalize(cross(p0, vec3(1.0, 0.0, 0.0)) + cross(p0, vec3(0.0, 1.0, 0.0)));
          vec3 vecBitangent = normalize(cross(vecTangent, p0));
          vec3 ptTangentSample = getPos(normalize(p0 + theta * normalize(vecTangent)));
          vec3 ptBitangentSample = getPos(normalize(p0 + theta * normalize(vecBitangent)));
          
          objectNormal = normalize(cross(ptBitangentSample - p0, ptTangentSample - p0));
          
          ///////////////////////////////////////////////
        `
        )
        .replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
          transformed = p0;
          rPos = transformed;
        `
        );
      //console.log(shader.vertexShader);
      shader.fragmentShader = `
        #define ss(a, b, c) smoothstep(a, b, c)
        uniform float bloom;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 rPos;
        ${shader.fragmentShader}
      `
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
        vec3 col = mix(color1, color2, ss(2., 6., length(rPos)));
        vec4 diffuseColor = vec4( col, opacity );
        `
        )
        .replace(
          `#include <dithering_fragment>`,
          `#include <dithering_fragment>
          
          //https://madebyevan.com/shaders/grid/
          float coord = length(rPos) * 6.;
          float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) / 1.25;
          float grid = 1.0 - min(line, 0.6);
          //////////////////////////////////////
          
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0), bloom);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, col * 2., grid);
          
        `
        );
      //console.log(shader.fragmentShader);
    },
  });

  let o = new THREE.Mesh(g, m);

  return o;
}

function makeShapeVariant2() {
  this.geometry = new THREE.IcosahedronGeometry(2, 100);

  this.material = new THREE.MeshStandardMaterial({
    onBeforeCompile: (shader) => {
      this.material.userData.shader = shader;
      // uniforms
      shader.uniforms.uTime = { value: 0 };

      const parsVertexString = /* glsl */ `#include <displacementmap_pars_vertex>`;
      shader.vertexShader = shader.vertexShader.replace(
        parsVertexString,
        parsVertexString + "\n" + shape2VertexPars
      );

      const mainVertexString = /* glsl */ `#include <displacementmap_vertex>`;
      shader.vertexShader = shader.vertexShader.replace(
        mainVertexString,
        mainVertexString + "\n" + shape2VertexMain
      );

      const parsFragmentString = /* glsl */ `#include <bumpmap_pars_fragment>`;
      shader.fragmentShader = shader.fragmentShader.replace(
        parsFragmentString,
        parsFragmentString + "\n" + shape2FragmentPars
      );

      const mainFragmentString = /* glsl */ `#include <normal_fragment_maps>`;
      shader.fragmentShader = shader.fragmentShader.replace(
        mainFragmentString,
        mainFragmentString + "\n" + shape2FragmentMain
      );
    },
  });

  this.mesh = new THREE.Mesh(this.geometry, this.material);

  return this.mesh;
}

export function SceneManager() {
  this.init = async () => {
    this.scene = getScene();
    // this.scene.background = new THREE.TextureLoader().load(
    //   "bg-gradient-noise.png"
    // );
    this.renderer = getRenderer();
    this.camera = getCamera();
    this.gui = getGui();
    const { width, height } = getRenderSize();
    this.width = width;
    this.height = height;
    this.showHelpers = true;
    // this.fontLoader = new FontLoader();

    this.enableOrbitControls = true;
    this.enableBloom = false;

    this.camera.position.z = 5;
    this.camera.position.x = 5;

    this.MOTION_BLUR_AMOUNT = 0.5;

    // this.renderer = new THREE.WebGLRenderer({
    //   antialias: true,
    //   alpha: true,
    // });
    // this.renderer.setClearColor(0xffffff, 0.0);
    // const bgTexture = new THREE.TextureLoader().load(
    //   "/images/bg-gradient-noise.png"
    // );

    // this.renderer.setClearColor(0, 0);

    // this.cubeMap = this.createCubeMap();

    // this.clock = new THREE.Clock();

    // this.renderScene = new RenderPass(this.scene, this.camera);

    // this.finalPass = new ShaderPass(
    //   new THREE.ShaderMaterial({
    //     uniforms: {
    //       baseTexture: { value: null },
    //     },
    //     // vertexShader: shape2Vertex,
    //     // fragmentShader: shape2Fragment,
    //     defines: {},
    //   }),
    //   "baseTexture"
    // );

    // if (this.enableBloom) {
    //   this.bloomComposer = this.makeBloomComposer();

    //   this.finalPass.material.uniforms.bloomTexture = {
    //     value: this.bloomComposer.renderTarget2.texture,
    //   };
    // }
    // this.finalPass.needsSwap = true;

    // this.finalComposer = new EffectComposer(this.renderer);
    // this.finalComposer.addPass(this.renderScene);
    // this.finalComposer.addPass(this.finalPass);
  };

  this.start = () => {
    this.addLights();
    this.addMainShape();

    if (this.enableOrbitControls) {
      this.addOrbitControls();
    }
    let i = 0;

    getTick(({ timestamp, timeDiff }) => {
      const time = timestamp / 10000;
      this.mainShape.material.userData.shader.uniforms.uTime.value = time;
    });
  };

  this.applyPostProcessing = () => {
    // this.renderer.setAnimationLoop(() => {
    // let t = this.clock.getElapsedTime();
    // if (this.enableOrbitControls) {
    // this.controls.update();
    // }
    // this.globalUniforms.time.value = t * 0.1;

    // renderer.setRenderTarget(rt);
    // renderer.render(bScn, bCam);
    // this.renderer.setRenderTarget(null);

    // if (this.enableBloom) {
    //   this.globalUniforms.bloom.value = 1;
    //   this.bloomComposer.render();
    //   this.globalUniforms.bloom.value = 0;
    // }
    // scene.background = rt.texture;
    // const bgTexture = new THREE.TextureLoader().load(
    //   "/images/header-bg-gradient-2.png"
    // );
    // this.scene.background = bgTexture;

    // this.finalComposer.render();
    //renderer.render(scene, camera);
    // });

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

    addPass(
      new UnrealBloomPass(
        new THREE.Vector2(this.width, this.height),
        0.4,
        0.4,
        0.4
      )
    );
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

    const bloomComposer = new EffectComposer(this.renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(this.renderScene);
    bloomComposer.addPass(bloomPass);

    return bloomComposer;
  };

  this.addOrbitControls = () => {
    const controls = new OrbitControls(
      this.mainShape,
      this.renderer.domElement
    );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed *= 0.25;

    this.controls = controls;
  };

  // this.bindListeners = () => {
  //   window.addEventListener("resize", () => this.handleResize());
  // };

  this.addMainShape = () => {
    // this.mainShape = makeShapeVariant1(this.cubeMap, this.globalUniforms);
    this.mainShape = new makeShapeVariant2();

    this.scene.add(this.mainShape);
  };

  this.addLights = () => {
    // let light = new THREE.DirectionalLight(0xffffff, 1.75);
    // light.position.setScalar(1);

    // this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));

    this.dirLight = new THREE.DirectionalLight("#5B51C9", 0.4);
    this.dirLight.position.set(0, 0, 2);

    // const dirLight2 = new THREE.DirectionalLight('#E26770', 0.6)
    // dirLight2.position.set(0, -15, 2)

    this.ambientLight = new THREE.AmbientLight("#FFFFFF", 0.15);
    this.scene.add(this.dirLight, this.ambientLight);
  };

  // this.handleResize = () => {
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  //   this.camera.updateProjectionMatrix();
  //   this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
  //   this.finalComposer.setSize(window.innerWidth, window.innerHeight);
  //   // rt.setSize(sceneRect.width, sceneRect.height);
  //   this.globalUniforms.aspect.value = this.camera.aspect;
  // };

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
