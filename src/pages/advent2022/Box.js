import React, { useState, useRef } from 'react';

function Box(props) {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [x, y, z] = props.position;
    const color = `rgb(${x * 8}, ${y *5}, ${z * 12})`;

    return (
      <mesh
        {...props}
        ref={mesh}
        scale={1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'orange' : color} />
      </mesh>
    )
  }

  export default Box;
