import Ball from './Ball';
import Floor from './Floor';
import { Physics } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
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
          position: [1, 10, 4],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Physics>
          <Ball />
          <Floor />
        </Physics>
        <ambientLight intensity={5} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
