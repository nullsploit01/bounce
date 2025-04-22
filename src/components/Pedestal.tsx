import { useBox } from '@react-three/cannon';

const Pedestal = () => {
  const [ref] = useBox(() => ({
    material: 'rubber',
    position: [0, 5, 0],
    args: [20, 1, 10],
    type: 'Static',
  }));

  return (
    <mesh ref={ref} position={[0, 5, 0]}>
      <boxGeometry args={[20, 1, 10]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default Pedestal;
