import { useBox } from '@react-three/cannon';
import { Vector3 } from 'three';

const Pedestal = ({ position }: { position: Vector3 }) => {
  const [ref] = useBox(() => ({
    material: 'rubber',
    position: [position.x, position.y, position.z],
    args: [20, 1, 10],
    type: 'Static',
  }));

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[20, 1, 10]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  );
};

export default Pedestal;
