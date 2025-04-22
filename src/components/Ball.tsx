import { useSphere } from '@react-three/cannon';

const Ball = () => {
  const [ref] = useSphere(() => ({ mass: 100, position: [0, 10, 0], material: 'rubber' }));

  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Ball;
