normal = perturbNormalArb(- vViewPosition, normal, vec2(dFdx(vDisplacement), dFdy(vDisplacement)), faceDirection);

vec4 color = vec4(vec3(2.0, 2.0, 2.0), 1.0);
gl_FragColor = color;
