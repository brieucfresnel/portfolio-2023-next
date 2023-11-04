normal = perturbNormalArb(- vViewPosition, normal, vec2(dFdx(vDisplacement), dFdy(vDisplacement)), faceDirection);

gl_FragColor = vec4(vec3(1, 1, 1), 1);
