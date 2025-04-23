import Ball from './Ball';
import Floor from './Floor';
import Pedestal from './Pedestal';
import { Physics, useContactMaterial } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';

const CanvasWrapper = () => {
  const BouncyMaterial = () => {
    useContactMaterial('rubber', 'rubber', {
      friction: 0.7,
      restitution: 0.8,
    });
    return null;
  };

  const pedestals = useMemo(() => {
    const list = [];
    let currentY = 0;

    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 100; // -10 to 10
      const y = currentY + Math.random() * 3 + 3.5; // move upward
      const z = (Math.random() - 0.5) * 20;
      currentY = y;

      list.push({ id: i, position: [x, y, z] as [number, number, number] });
    }

    return list;
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 100,
          position: [100, 15, 30],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Physics gravity={[0, -9.8, 0]}>
          <BouncyMaterial />
          {pedestals.map(({ id, position }) => (
            <Pedestal key={id} position={new Vector3(...position)} />
          ))}
          <Ball />
          <Floor />
        </Physics>
        <ambientLight intensity={5} />
        {/* <OrbitControls makeDefault /> */}
        <Stats />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
