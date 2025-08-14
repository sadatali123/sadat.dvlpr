import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDEarth = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const lightsRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create Earth material with the earth map texture
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2, // Natural blue ocean color
      shininess: 15,
      transparent: false,
      opacity: 1.0
    });

    // Create Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    earthRef.current = earth;
    scene.add(earth);

    // Add Earth map texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/earthmap_1.jpg', (texture) => {
      earthMaterial.map = texture;
      earthMaterial.needsUpdate = true;
    });

    // Earth night lights layer
    const lightsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const lightsMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const lights = new THREE.Mesh(lightsGeometry, lightsMaterial);
    lightsRef.current = lights;
    scene.add(lights);

    // Add Earth lights texture
    textureLoader.load('/images/earth_lights_2.png', (texture) => {
      lightsMaterial.map = texture;
      lightsMaterial.needsUpdate = true;
    });

    // Clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });

    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    cloudsRef.current = clouds;
    scene.add(clouds);

    // Add clouds texture
    textureLoader.load('/images/cloud_combined_3.jpg', (texture) => {
      cloudsMaterial.map = texture;
      cloudsMaterial.needsUpdate = true;
    });

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate Earth
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.005;
      }

      // Rotate lights layer
      if (lightsRef.current) {
        lightsRef.current.rotation.y += 0.005;
      }

      // Rotate clouds slightly faster for atmospheric effect
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.006;
      }

      // Rotate stars slowly
      // stars.rotation.y += 0.0005; // Removed stars rotation

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction for rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown || !earthRef.current || !lightsRef.current || !cloudsRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      const rotationSpeed = 0.01;
      earthRef.current.rotation.y += deltaX * rotationSpeed;
      earthRef.current.rotation.x += deltaY * rotationSpeed;
      
      lightsRef.current.rotation.y += deltaX * rotationSpeed;
      lightsRef.current.rotation.x += deltaY * rotationSpeed;
      
      cloudsRef.current.rotation.y += deltaX * rotationSpeed;
      cloudsRef.current.rotation.x += deltaY * rotationSpeed;

      // Limit vertical rotation
      earthRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRef.current.rotation.x));
      lightsRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, lightsRef.current.rotation.x));
      cloudsRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cloudsRef.current.rotation.x));

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseUp);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseleave', handleMouseUp);

      // Dispose of resources
      earthGeometry.dispose();
      earthMaterial.dispose();
      lightsGeometry.dispose();
      lightsMaterial.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      // starsGeometry.dispose(); // Removed stars geometry disposal
      // starsMaterial.dispose(); // Removed stars material disposal
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
    />
  );
};

export default ThreeDEarth; 