import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Box from './Box';


export const Table3d = ({tableData = [[]], drawCell, zHeight, viewPosition}) => {

  const convertedData = [];

  for (let yIndex = 0; yIndex < tableData.length; yIndex += 1) {
    const row = tableData[yIndex];
    for (let xIndex = 0; xIndex < row.length; xIndex += 1) {
      const cellValue  = row[xIndex];
      if (drawCell(cellValue)) {
        convertedData.push([
          xIndex,
          (yIndex * -1),
          1 || zHeight && zHeight(cellValue)
        ]);
      }
    }
  }

  return (
    <Canvas style={{ height: '100%' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[50, 50, 30]} />
      {
        [...convertedData].map(position => {
          return (
            <Box key={JSON.stringify(position)} position={position} />
          );
        })
      }
      <PerspectiveCamera
        makeDefault
        position={viewPosition || [40, 40, 40]}
        fov={60}
        zoom={1}
      />
      {/* <OrbitControls target={[10,10,10]} /> */}
      <OrbitControls />
    </Canvas>
  );
};
