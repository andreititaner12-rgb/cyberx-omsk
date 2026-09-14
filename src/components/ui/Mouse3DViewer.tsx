import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, ZoomIn, Box, Loader2 } from 'lucide-react';

export const Mouse3DViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 5.0);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Studio Esports Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainKeyLight.position.set(3, 6, 4);
    scene.add(mainKeyLight);

    const redRimLight = new THREE.PointLight(0xE32124, 6.5, 15);
    redRimLight.position.set(-3, 2, -2);
    scene.add(redRimLight);

    const blueFillLight = new THREE.PointLight(0x3b82f6, 2.2, 10);
    blueFillLight.position.set(3, -2, 3);
    scene.add(blueFillLight);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 4. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/mouse.glb',
      (gltf) => {
        const object = gltf.scene;

        // Auto-compute bounding box to center and normalize model scale
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        object.position.x += object.position.x - center.x;
        object.position.y += object.position.y - center.y;
        object.position.z += object.position.z - center.z;

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.6 / maxDim;
        object.scale.set(scale, scale, scale);

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness || 0.4, 0.6);
            }
          }
        });

        modelRoot.add(object);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading mouse.glb:', err);
        setLoading(false);
      }
    );

    // Initial angle
    modelRoot.rotation.x = 0.35;
    modelRoot.rotation.y = -0.55;

    // 5. User Drag & Isolated Zoom Controls (Page DOES NOT scroll)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetZoom = 1;
    let currentZoom = 1;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      modelRoot.rotation.y += deltaX * 0.012;
      modelRoot.rotation.x += deltaY * 0.012;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Strictly intercept wheel on 3D viewer container to prevent window scrolling
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const delta = e.deltaY * -0.0015;
      targetZoom = Math.min(Math.max(0.65, targetZoom + delta), 2.0);
      setZoomLevel(targetZoom);
      return false;
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      modelRoot.rotation.y += deltaX * 0.012;
      modelRoot.rotation.x += deltaY * 0.012;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Non-passive wheel handler on both container and dom to stop page scrolling
    container.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('wheel', onWheel, { passive: false });

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth idle rotation when not dragging
      if (!isDragging) {
        modelRoot.rotation.y += 0.004;
      }

      // Smooth zoom interpolation
      currentZoom += (targetZoom - currentZoom) * 0.12;
      camera.position.set(0, 2.8 / currentZoom, 5.0 / currentZoom);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e0e16] to-[#06060a] border border-white/10 group select-none touch-none"
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 gap-2 text-zinc-400 font-mono text-xs">
          <Loader2 className="w-4 h-4 text-[#E32124] animate-spin" />
          <span>Загрузка 3D модели...</span>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <span className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white flex items-center gap-1.5 shadow-lg">
          <Box className="w-3 h-3 text-[#E32124]" />
          3D МОДЕЛЬ GLB (360°)
        </span>
      </div>

      {/* Bottom Hint Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-[10px] font-mono text-zinc-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="flex items-center gap-1.5 text-zinc-200">
          <RotateCw className="w-3 h-3 text-[#E32124]" />
          Крутите 3D мышь мышкой
        </span>
        <span className="flex items-center gap-1 text-zinc-300 font-bold">
          <ZoomIn className="w-3 h-3 text-[#E32124]" />
          Зум колесом: {Math.round(zoomLevel * 100)}%
        </span>
      </div>
    </div>
  );
};

export default Mouse3DViewer;
