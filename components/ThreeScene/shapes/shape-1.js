import * as THREE from "three";

import noiseFS from "assets/shaders/shape-1/noise-fs.glsl";

export default function ShapeVariant1(cubeMap) {
  let g = new THREE.IcosahedronGeometry(1, 200);
  let localUniforms = {
    color1: { value: new THREE.Color(0xdf3838) },
    color2: { value: new THREE.Color(0xc9d1ff) },
  };

  let m = new THREE.MeshStandardMaterial({
    roughness: 0.125,
    metalness: 0.875,
    envMap: cubeMap,
    onBeforeCompile: (shader) => {
      m.userData.shader = shader;

      shader.uniforms.color1 = localUniforms.color1;
      shader.uniforms.color2 = localUniforms.color2;
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `
        uniform float uTime;
        varying vec3 rPos;
        varying float vDisplacement;
        const float PI = 3.141592653589793;
        ${noiseFS}
        
        float smoothMod(float axis, float amp, float rad) {
          float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
          float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
          float at = atan(top / bottom);
          return amp * (1.0 / 2.0) - (1.0 / PI) * at;
        }
        
        float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
          return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
        }
        
        float wave(vec3 position) {
          return fit(smoothMod(position.y * 6.0, 1.0, 1.5), 0.35, 0.6, 0.0, 1.0);
        }
        
        float noise(vec3 p){
          return cnoise(vec4(p, uTime));
        }
        vec3 getPos(vec3 p){
          return p * (4. + noise(p * 3.) * 2.);
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

          // position.y += uTime;
          // vec3 noisePattern = vec3(noise(position / 1.5));
          float pattern = wave(position + uTime);
          
          // varyings
          vDisplacement = pattern;
          
          float displacement = vDisplacement / 3.0;

          p0 += normalize(objectNormal) * displacement;
          
          
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
        varying float vDisplacement;
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
          float line = abs(fract(coord - 0.3) - 0.5) / fwidth(coord) / 1.25;
          float grid = 1.0 - min(line, 0.6);
          //////////////////////////////////////
          
          gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0), bloom);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, col * 2., grid);
          
        `
        )
        .replace(
          `#include <normal_fragment_maps>`,
          `#include <normal_fragment_maps>
           normal = perturbNormalArb(- vViewPosition, normal, vec2(dFdx(vDisplacement), dFdy(vDisplacement)), faceDirection);

           gl_FragColor = vec4(vec3(1, 1, 1), 1);
          `
        )
        .replace(
          `#include <bumpmap_pars_fragment>`,
          `#include <bumpmap_pars_fragment>
          uniform float uTime;

vec3 perturbNormalArb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection) {

  vec3 vSigmaX = dFdx(surf_pos.xyz);
  vec3 vSigmaY = dFdy(surf_pos.xyz);
  vec3 vN = surf_norm; // normalized

  vec3 R1 = cross(vSigmaY, vN);
  vec3 R2 = cross(vN, vSigmaX);

  float fDet = dot(vSigmaX, R1) * faceDirection;

  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);

}
           `
        );
      console.log(shader.fragmentShader);
    },
  });

  let o = new THREE.Mesh(g, m);

  return o;
}
