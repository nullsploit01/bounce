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
          position: [0, 3, 3],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial />
        </mesh>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
