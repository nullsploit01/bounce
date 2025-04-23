import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Ball = () => {
  const [ref, api] = useSphere(() => ({ mass: 10, position: [0, 1, 0], material: 'rubber' }));
  const pressedKeys = useRef<Set<string>>(new Set());
  const velocity = useRef([0, 0, 0]);
  const { camera } = useThree();

  useEffect(() => {
    const down = (e: KeyboardEvent) => pressedKeys.current.add(e.code);
    const up = (e: KeyboardEvent) => pressedKeys.current.delete(e.code);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
    return unsubscribe;
  }, [api.velocity]);

  useFrame(() => {
    const keys = pressedKeys.current;
    let moveX = 0,
      moveZ = 0;

    if (keys.has('KeyA') || keys.has('ArrowLeft')) moveX -= 5;
    if (keys.has('KeyD') || keys.has('ArrowRight')) moveX += 5;
    if (keys.has('KeyW') || keys.has('ArrowUp')) moveZ -= 5;
    if (keys.has('KeyS') || keys.has('ArrowDown')) moveZ += 5;

    const [, vy] = velocity.current;

    api.velocity.set(moveX, vy, moveZ);

    if (keys.has('Space')) {
      api.applyImpulse([0, 5, 0], [0, 0, 0]);
    }

    if (ref.current) {
      const ballPos = ref.current.position;
      const camTarget = new THREE.Vector3(ballPos.x, ballPos.y + 5, ballPos.z + 10);
      camera.position.lerp(camTarget, 0.1);
      camera.lookAt(ballPos);
    }
  });

  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Ball;
