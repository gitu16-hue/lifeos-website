'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create neural network nodes (particles)
    const nodeCount = 300;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      nodePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nodePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Colors based on position
      nodeColors[i * 3] = 0.4 + 0.4 * Math.sin(theta);
      nodeColors[i * 3 + 1] = 0.2 + 0.4 * Math.cos(phi);
      nodeColors[i * 3 + 2] = 0.8 + 0.2 * Math.sin(phi);
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Create connections between nodes
    const connectionPositions = [];
    const connectionColors = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.sqrt(
          Math.pow(nodePositions[i * 3] - nodePositions[j * 3], 2) +
          Math.pow(nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1], 2) +
          Math.pow(nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2], 2)
        );

        if (dist < 8 && Math.random() > 0.7) {
          connectionPositions.push(
            nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
            nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
          );

          const alpha = 1 - dist / 8;
          connectionColors.push(
            0.6, 0.4, 0.9, alpha,
            0.6, 0.4, 0.9, alpha
          );
        }
      }
    }

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 4));

    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Add floating data particles
    const dataCount = 500;
    const dataGeometry = new THREE.BufferGeometry();
    const dataPositions = new Float32Array(dataCount * 3);

    for (let i = 0; i < dataCount; i++) {
      dataPositions[i * 3] = (Math.random() - 0.5) * 40;
      dataPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dataPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    dataGeometry.setAttribute('position', new THREE.BufferAttribute(dataPositions, 3));

    const dataMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00F5D4,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const data = new THREE.Points(dataGeometry, dataMaterial);
    scene.add(data);

    camera.position.z = 25;

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const time = Date.now() * 0.0002;

      // Rotate the network
      nodes.rotation.y += 0.0005;
      nodes.rotation.x += 0.0003;
      connections.rotation.y += 0.0005;
      connections.rotation.x += 0.0003;
      data.rotation.y += 0.0008;

      // Pulse nodes based on time
      const sizes = nodeGeometry.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        const pulse = Math.sin(time + i) * 0.5 + 0.5;
        // This would affect node sizes, but PointsMaterial doesn't support per-point size
        // We'll use a different approach: make some nodes glow
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      <div className="neural-grid" />
    </>
  );
}