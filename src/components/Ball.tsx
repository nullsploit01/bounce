const Ball = () => {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Ball;
