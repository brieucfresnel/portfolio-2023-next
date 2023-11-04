import * as THREE from "three";
import shape2FragmentMain from "assets/shaders/shape-2/fragment_main.glsl";
import shape2FragmentPars from "assets/shaders/shape-2/fragment_pars.glsl";
import shape2VertexMain from "assets/shaders/shape-2/vertex_main.glsl";
import shape2VertexPars from "assets/shaders/shape-2/vertex_pars.glsl";

export default function ShapeVariant2(cubeMap) {
  this.geometry = new THREE.IcosahedronGeometry(2, 200);

  this.material = new THREE.MeshStandardMaterial({
    roughness: 0.125,
    metalness: 0.875,
    envMap: cubeMap,
    // color: 0xffffff,

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
    // emissive: 0xffffff,
    // emissiveIntensity: 0.2,
  });

  this.mesh = new THREE.Mesh(this.geometry, this.material);

  return this.mesh;
}
