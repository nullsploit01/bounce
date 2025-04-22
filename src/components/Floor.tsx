import { usePlane } from '@react-three/cannon';

const Floor = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default Floor;
