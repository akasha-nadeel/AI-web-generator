"use client";

import { useRef, useEffect, useCallback } from "react";

const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_intensity;
  uniform vec2 u_resolution;

  void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse;

    float dist = distance(uv, mouse);
    float radius = 0.25;
    float strength = u_intensity * 0.06;

    if (dist < radius) {
      float factor = 1.0 - (dist / radius);
      factor = factor * factor * factor;

      vec2 dir = uv - mouse;
      float angle = u_time * 0.5;

      // Swirl + bulge distortion
      float s = sin(angle) * factor * strength;
      float c = cos(angle) * factor * strength;

      vec2 offset = vec2(
        dir.x * cos(s * 6.0) - dir.y * sin(s * 6.0),
        dir.x * sin(s * 6.0) + dir.y * cos(s * 6.0)
      ) - dir;

      // Ripple
      float ripple = sin(dist * 30.0 - u_time * 3.0) * factor * strength * 0.5;

      uv += offset + vec2(ripple);
    }

    gl_FragColor = texture2D(u_image, uv);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export function DistortionImage({ src, alt = "", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const intensityRef = useRef(0);
  const targetIntensityRef = useRef(0);
  const rafRef = useRef<number>(0);
  const glRef = useRef<{
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    mouseLoc: WebGLUniformLocation;
    timeLoc: WebGLUniformLocation;
    intensityLoc: WebGLUniformLocation;
    resLoc: WebGLUniformLocation;
  } | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    targetMouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    targetIntensityRef.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetIntensityRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    // Geometry
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,1, 1,1, 0,0, 1,0]), gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const mouseLoc = gl.getUniformLocation(program, "u_mouse")!;
    const timeLoc = gl.getUniformLocation(program, "u_time")!;
    const intensityLoc = gl.getUniformLocation(program, "u_intensity")!;
    const resLoc = gl.getUniformLocation(program, "u_resolution")!;

    // Load texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      glRef.current = { gl, program, mouseLoc, timeLoc, intensityLoc, resLoc };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      const startTime = performance.now();

      const render = () => {
        const t = (performance.now() - startTime) / 1000;

        // Smooth mouse lerp
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;
        intensityRef.current += (targetIntensityRef.current - intensityRef.current) * 0.05;

        gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(timeLoc, t);
        gl.uniform1f(intensityLoc, intensityRef.current);
        gl.uniform2f(resLoc, canvas.width, canvas.height);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        rafRef.current = requestAnimationFrame(render);
      };

      render();
    };
    img.src = src;

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [src, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={alt}
      role="img"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
