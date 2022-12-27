import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { find } from 'lodash';
import Plot from 'react-plotly.js'
import Cube from './Cube';
import Box from '../../components/Box';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day18';

function Day18() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    // x,y,z
    let minX = Infinity;
    let maxX = 0;
    let minY = Infinity;
    let maxY = 0;
    let minZ = Infinity;
    let maxZ = 0;
    const coordsMap = {
      x: [],
      y: [],
      z: []
    };
    const coords = input.split('\n').map(coord => {
      const [x, y, z] = coord.split(',').map(Number);

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      maxZ = Math.max(maxZ, z);
      coordsMap.x.push(x);
      coordsMap.y.push(y);
      coordsMap.z.push(z);

      return [x, y, z];
    });

    return{
      coordsMap,
      coords,
      minX: minX - 1,
      maxX: maxX + 1,
      minY: minY - 1,
      maxY: maxY + 1,
      minZ: minZ - 1,
      maxZ: maxZ + 1,
    }
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(puzzle1));
  const { coords, coordsMap, minX, maxX, minY, maxY, minZ, maxZ } = puzzle;
  const cubes = [];
  let openFaces = 0;

  [...coords].forEach(cube => {
    const [x, y, z] = cube;
    const newCube = new Cube(cube, [...coords]);
    newCube.checkContact();
    openFaces += newCube.openFaces;
    cubes.push(newCube);
  });
  
  const outerCells = [];
  const visitedMap = {};
  const queuedMap = {};

  const searchFromCell = (ix, iy, iz) => {
    const queue = [[ix, iy, iz]];

    while (queue.length > 0) {
      const [x, y, z] = queue.shift();
      visitedMap[`${x}:${y}:${z}`] = true;
      if (x <= maxX && x >= minX && y <= maxY && y >= minY && z <= maxZ && z >= minZ) {
  
        const foundExisting = find([...coords], ([testX, testY, testZ]) => {
          return x === testX && y === testY && z === testZ;
        });
    
        if(!foundExisting) {
          outerCells.push([x, y, z]);
          const directions = [
            [x, y + 1, z],
            [x, y - 1, z],
            [x - 1, y, z],
            [x + 1, y, z],
            [x, y, z - 1],
            [x, y, z + 1]
          ];
    
          directions.forEach(d => {
            if (!visitedMap[`${d[0]}:${d[1]}:${d[2]}`]
              && !queuedMap[`${d[0]}:${d[1]}:${d[2]}`]
              && d[0] <= maxX && d[0] >= minX 
              && d[1] <= maxY && d[1] >= minY
              && d[2] <= maxZ && d[2] >= minZ
              ) {
              queuedMap[`${d[0]}:${d[1]}:${d[2]}`] = true;
              queue.push([...d]);
            }
          });
        }
      }
    }
  }

  searchFromCell(minX, minY, minZ);

  const xDiff = Math.abs(maxX - minX) + 1;
  const yDiff = Math.abs(maxY - minY) + 1;
  const zDiff = Math.abs(maxZ - minZ) + 1;

  const leftRightSize = (yDiff * zDiff) * 2;
  const topBottomSize = (xDiff * zDiff) * 2;
  const frontBackSize = (xDiff * yDiff) * 2;
  const sidesTotal = leftRightSize + topBottomSize + frontBackSize;


  let innerCubeOpenFaces = 0;
  const innerCubes = [];
  [...outerCells].forEach(coord => {
    const newCube = new Cube(coord, [...outerCells]);
    newCube.checkContact();
    innerCubeOpenFaces += newCube.openFaces;
    innerCubes.push(newCube);
  });
    


  console.log('The puzzle x,y,z', puzzle);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={18} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>Open faces {openFaces}</div>
        <div>Surrounding cube faces {innerCubeOpenFaces} </div>
        <div>Part two outer only faces {innerCubeOpenFaces - sidesTotal}</div>
        <div className="d-flex justify-content-center">
          <div style={{ height: 800, width: 800 }}>
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[50, 50, 30]} />
              {
                [...puzzle.coords].map(cube => {
                  return (
                    <Box key={JSON.stringify(cube)} position={cube} />
                  );
                })
              }
              <PerspectiveCamera
                makeDefault
                position={[40, 0.9, 1.8]}
                fov={60}
                zoom={1}
              />
              <OrbitControls target={[10,10,10]} />
            </Canvas>
          </div>
          <div style={{ height: 800, width: 800 }}>
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[50, 50, 30]} />
              {
                [...outerCells].map(cube => {
                  return (
                    <Box key={JSON.stringify(cube)} position={cube} />
                  );
                })
              }
              <PerspectiveCamera
                makeDefault
                position={[40, 40, 40]}
                fov={60}
                zoom={1}
              />
              <OrbitControls target={[10,10,10]} />
            </Canvas>
          </div>
          <div>
            <Plot
              data={[
                {
                  x: coordsMap.x, 
                  y: coordsMap.y, 
                  z: coordsMap.z, 
                  mode: 'markers', 
                  type:'scatter3d', 
                  scene: 'scene1', 
                  name: 'Lower the view point'
                }
              ]}
              layout={{
                height: 800,
                width: 800,
                title: `3D Views`,
                scene1: {
                  camera: {
                    center: {x: 0, y: 0, z: 0},
                    eye: {x: 2, y: 2, z: 0.1},
                    up: {x: 0, y: 0, z: 1}
                  }
                }
              }}
            />
          </div>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day18;
