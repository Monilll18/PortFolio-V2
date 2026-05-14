"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Color } from 'ogl';

interface UiloraRasterProps {
    dotColor?: string;
    accentColor?: string;
    density?: number;
    speed?: number;
}

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uDensity;
  uniform float uSpeed;

  varying vec2 vUv;

  // --- Noise for Fluid Movement ---
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    // --- GRID DYNAMICS ---
    // Instead of a static grid, we offset the UVs slightly with noise
    float movement = snoise(uv * 0.5 + uTime * uSpeed * 0.1);
    vec2 gridUv = uv + movement * 0.02;
    
    vec2 gv = fract(gridUv * uDensity) - 0.5;
    vec2 id = floor(gridUv * uDensity);

    // --- MOUSE INFLUENCE ---
    float dist = distance(uv, mouse);
    // Exponential falloff for "Premium" weight
    float influence = smoothstep(0.4, 0.0, dist);
    
    // Size of the dots (Sine wave + Mouse influence)
    float baseSize = sin(uTime * uSpeed + (id.x + id.y) * 0.2) * 0.1 + 0.2;
    float dotSize = baseSize + influence * 0.4;

    // --- RENDERING SHARPNESS ---
    // Perfect circles using length
    float d = length(gv);
    float mask = smoothstep(dotSize, dotSize - 0.05, d);

    // --- COLOR INTERPOLATION ---
    // Mix between dark dots and high-intensity accent dots
    vec3 color = mix(uColor, uAccentColor, influence);
    
    // Add a secondary glow to the "Active" dots
    float glow = smoothstep(0.4, 0.0, d) * influence;
    vec3 finalColor = color + (uAccentColor * glow * 0.5);

    // Film grain for texture
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) * 0.04;
    
    gl_FragColor = vec4(finalColor + grain, mask);
  }
`;

const UiloraKineticRaster: React.FC<UiloraRasterProps> = ({
    dotColor = "#222222",
    accentColor = "#ffffff",
    density = 30,
    speed = 1.0,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef(new Vec2(0.5, 0.5));
    const targetMouse = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({ alpha: true, antialias: true, dpr: window.devicePixelRatio });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uMouse: { value: mousePos.current },
                uColor: { value: new Color(dotColor) },
                uAccentColor: { value: new Color(accentColor) },
                uDensity: { value: density },
                uSpeed: { value: speed },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            targetMouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', onMouseMove);

        let requestId: number;
        const update = (t: number) => {
            requestId = requestAnimationFrame(update);
            // Elastic lerping for that "another level" premium feel
            mousePos.current.lerp(targetMouse.current, 0.07);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        requestId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestId);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            if (containerRef.current?.contains(gl.canvas)) containerRef.current.removeChild(gl.canvas);
        };
    }, [dotColor, accentColor, density, speed]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default UiloraKineticRaster;
