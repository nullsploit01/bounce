import { useSphere } from '@react-three/cannon';
import { useEffect } from 'react';

const Ball = () => {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 1, 0], material: 'rubber' }));

  useEffect(() => {
    const handleBounce = (e: any) => {
      if (e.type === 'keydown' && e.code !== 'Space') return;

      api.velocity.set(0, 7, 0); // Set upward velocity (bounce)
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
