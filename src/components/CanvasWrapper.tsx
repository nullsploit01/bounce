import Ball from './Ball';
import Floor from './Floor';
import { Physics, useContactMaterial } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  const BouncyMaterial = () => {
    useContactMaterial('rubber', 'rubber', {
      friction: 0.7,
      restitution: 0.4,
    });
    return null;
  };

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
          position: [1, 15, 30],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Physics>
          <BouncyMaterial />
          <Ball />
          <Floor />
        </Physics>
        <ambientLight intensity={5} />
        <OrbitControls makeDefault />
        <Stats />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
