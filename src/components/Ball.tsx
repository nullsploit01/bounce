import { useSphere } from '@react-three/cannon';
import { useEffect } from 'react';

const Ball = () => {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 1, 0], material: 'rubber' }));

  useEffect(() => {
    const handleBounce = (e: any) => {
      if (e.type === 'keydown') {
        switch (e.code) {
          case 'Space':
            api.velocity.set(0, 10, 0); // bounce
            break;
          case 'KeyA':
          case 'ArrowLeft':
            api.velocity.set(-5, 0, 0); // move left
            break;
          case 'KeyD':
          case 'ArrowRight':
            api.velocity.set(5, 0, 0); // move right
            break;
          case 'KeyW':
          case 'ArrowUp':
            api.velocity.set(0, 0, -5); // move forward
            break;
          case 'KeyS':
          case 'ArrowDown':
            api.velocity.set(0, 0, 5); // move backward
            break;
          default:
            break;
        }
      } else if (e.type === 'click') {
        api.velocity.set(0, 7, 0); // bounce on mouse click too
      }
    };

    window.addEventListener('keydown', handleBounce);
    window.addEventListener('click', handleBounce);

    return () => {
      window.removeEventListener('keydown', handleBounce);
      window.removeEventListener('click', handleBounce);
    };
  }, [api]);

  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Ball;
