import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { find } from 'lodash';
import Plot from 'react-plotly.js'
import Box from './Box';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
  innerCoords
} from '../../puzzles/2022/day18';

class Cube {
  constructor(coords, allCoords) {
    const [x, y, z] = coords;
    this.coords = coords;
    this.allCoords = allCoords
    this.x = x;
    this.y = y;
    this.z = z;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.forward = false;
    this.backward = false;
    this.touchingSides = 0;
  }

  checkCoord(testX, testY, testZ, direction) {
    const found =  find(this.allCoords, ([x, y, z]) => {
      return x === testX && y === testY && z === testZ;
    });

    if (found) {
      this[direction] = true;
      this.touchingSides += 1;
    }
  }

  checkContact() {
    // console.log('Look all directions from', this.coords);
    const [x, y, z] = this.coords;
    const directions = [
      [x, y + 1, z, 'up'], // up
      [x, y - 1, z, 'down'], // down
      [x - 1, y, z, 'left'], // left
      [x + 1, y, z, 'right'], // right
      [x, y, z - 1, 'forward'], // forward
      [x, y, z + 1, 'backward'] // backward
    ];

    directions.forEach(direction => {
      this.checkCoord(...direction);
    });

    this.openFaces = (6 - this.touchingSides);
  }

  checkContained() {



  }


}

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
      minX,
      maxX,
      minY,
      maxY,
      minZ,
      maxZ
    }
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(puzzle1));
  const [innerPuzzle, setInnerCoords] = useState(parsePuzzle(innerCoords));
  const { coords, coordsMap, minX, maxX, minY, maxY, minZ, maxZ } = puzzle;
  const tables = [...Array((maxZ - minZ) + 2)].map(table => 
    [...Array((maxY - minY) + 2)].map(row => 
      [...Array((maxX - minX) + 2).fill('O')]
    )
  );
  const cubes = [];
  let openFaces = 0;

  
  [...coords].forEach(cube => {
    const [x, y, z] = cube;
    const newCube = new Cube(cube, [...coords]);
    newCube.checkContact();
    openFaces += newCube.openFaces;
    cubes.push(newCube);
    tables[z][y][x] = '#';
  });
  
  console.log('Tables', tables);

  const searchDirection = ([x, y, z], [dx, dy, dz]) => {
    let result = false;
    let found = false;
    let newX = x;
    let newY = y;
    let newZ = z;

    while (!result) {
      newX = newX + dx;
      newY = newY + dy;
      newZ = newZ + dz; 
      // console.log('Look for new cell at', newX, newY, newZ);
      const cell = tables[newZ] && tables[newZ][newY] && tables[newZ][newY][newX];
      /// const cell =  find(coords, ([x, y, z]) => {
        // return x === newX && y === newY && z === newZ;
      // });
      // console.log('cell found', found);

      if(cell === '#' || cell === undefined) {
        found = cell;
        result = true;
        break;
      }
    }

    return found;
  };

  const innerCells = [];

  for (let zIndex = 0; zIndex < tables.length; zIndex += 1) {
    const table = tables[zIndex];
    for (let yIndex = 0; yIndex < table.length; yIndex++) {
      const row = table[yIndex];
     for (let xIndex = 0; xIndex < row.length; xIndex++) {
      const cell = row[xIndex];
      if (cell === 'O') {
        //if (xIndex === 2 && yIndex === 2 && zIndex === 5) {

          // console.log('Search from', [xIndex, yIndex, zIndex]);
  
          try {          
            // const left = searchDirection([xIndex, yIndex, zIndex], [-1, 0, 0]);
            // const right = searchDirection([xIndex, yIndex, zIndex], [1, 0, 0]);
            // const up = searchDirection([xIndex, yIndex, zIndex], [0, -1, 0]);
            // const down = searchDirection([xIndex, yIndex, zIndex], [0, 1, 0]);
            // const forward = searchDirection([xIndex, yIndex, zIndex], [0, 0, -1]);
            // const backward = searchDirection([xIndex, yIndex, zIndex], [0, 0, 1]);
            const left = searchDirection([xIndex, yIndex, zIndex], [-1, 0, 0]) === '#';
            const right = searchDirection([xIndex, yIndex, zIndex], [1, 0, 0]) === '#';
            const up = searchDirection([xIndex, yIndex, zIndex], [0, -1, 0]) === '#';
            const down = searchDirection([xIndex, yIndex, zIndex], [0, 1, 0]) === '#';
            const forward = searchDirection([xIndex, yIndex, zIndex], [0, 0, -1]) === '#';
            const backward = searchDirection([xIndex, yIndex, zIndex], [0, 0, 1]) === '#';
  
            if (left && right && up && down && forward && backward) {
              innerCells.push([xIndex, yIndex, zIndex]);
              // console.log('found inner cell');
            }
  
  
          } catch (error) {
            console.log('The search error', error);
          }
        //}


      }
      // console.log('Cell', cell);
     } 
    }
  }

  let innerCubeOpenFaces = 0;
  const innerCubes = [];
  // console.log('All the inner cell coords', innerPuzzle);
  
  // innerPuzzle.coords.forEach(coord => {
  innerCells.forEach(coord => {
    const newCube = new Cube(coord, [...innerCells]);
    // const newCube = new Cube(coord, [...innerPuzzle.coords]);
    newCube.checkContact();
    innerCubeOpenFaces += newCube.openFaces;
    innerCubes.push(newCube);
  });
    
  console.log('All the inner cell coords', innerPuzzle);
  console.log('The inner cubes', innerCubes)
  console.log('The innerCells', innerCells);

  // console.log('cubes', cubes);
  // 4266
  // 2570 too low
  // 2576 too low
  // 2582 wrong
  // 2634 too high


  // inside faces 1966

  // 4536 - 1902 = 2634
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
        <div>Inside faces {innerCubeOpenFaces} </div>
        <div>Part two outer only faces {openFaces - innerCubeOpenFaces}</div>
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
              <OrbitControls />
            </Canvas>
          </div>
          <div style={{ height: 800, width: 800 }}>
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[50, 50, 30]} />
              {
                [...innerCells].map(cube => {
                  return (
                    <Box key={JSON.stringify(cube)} position={cube} />
                  );
                })
              }
              <OrbitControls />
            </Canvas>
          </div>
          {/* <div style={{ height: 800, width: 800 }}>
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[50, 50, 30]} />
              {
                [...innerPuzzle.coords].map(cube => {
                  return (
                    <Box key={JSON.stringify(cube)} position={cube} />
                  );
                })
              }
              <OrbitControls />
            </Canvas>
          </div> */}
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
