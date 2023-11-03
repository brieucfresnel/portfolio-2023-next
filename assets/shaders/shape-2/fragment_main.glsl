normal = perturbNormalArb(- vViewPosition, normal, vec2(dFdx(vDisplacement), dFdy(vDisplacement)), faceDirection);

gl_FragColor = vec4(vec3(1, 0, 1), 1);
