import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const Ball = () => {
  const [ref, api] = useSphere(() => ({ mass: 10, position: [0, 1, 0], material: 'rubber' }));
  const pressedKeys = useRef<Set<string>>(new Set());
  const velocity = useRef([0, 0, 0]);

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
    let x = 0,
      z = 0;

    if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 5;
    if (keys.has('KeyD') || keys.has('ArrowRight')) x += 5;
    if (keys.has('KeyW') || keys.has('ArrowUp')) z -= 5;
    if (keys.has('KeyS') || keys.has('ArrowDown')) z += 5;

    const [, vy] = velocity.current;

    api.velocity.set(x, vy, z);

    // Jump
    if (keys.has('Space')) {
      api.velocity.set(x, 10, z); // jump only if on/near ground
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
