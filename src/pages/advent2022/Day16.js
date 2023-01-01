import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { find, difference } from 'lodash';
import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day16';

function Day16() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    let startIndex = 0;
    const allMustVisitCaves = [];
    const allValvesMap = {};
    let valves = input.split('\n').map((valveInfo, index) => {
      let [valve, caves] = valveInfo.split(';')
      let [valveName, rate] = valve.replace('Valve ', '').replace(' has flow rate=', ':').split(':');
      caves = caves.replace(' tunnels lead to valves', '').replace(' tunnel leads to valve ', '').split(',').map(x => x.trim());

      //caves.push('end')

      if (valveName === 'AA') {
        startIndex = index
      }

      if (rate > 0) {
        allMustVisitCaves.push(valveName);
      }

      allValvesMap[valveName] = Number(rate);

      return {
        valveName,
        rate: Number(rate),
        caves
      };
    });

    const startValve = valves.splice(startIndex, 1);
    valves.unshift(startValve[0]);
    //valves.push({ valveName: 'end', caves: [] })
    return {
      allMustVisitCaves,
      allValvesMap,
      valves
    };
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(puzzle1));
  const [start, setStart] = useState(false);
  const {
    valves,
    allMustVisitCaves,
    allValvesMap
  } = puzzle;

  const caveCounts = {};

  const getPathScore = path => {
    console.log('the incoming path length', path.length);
    let totalPreasureOut = 0;
    let minutesLeft = 30;
    let presureReleased = 0;
    const openValves = [];
    const valves = [...path];
    let valveIndex = 0;

    for (let index = 1; index <= minutesLeft; index += 1) {
      const [valveName, open] = valves[valveIndex];
      const valveRate = allValvesMap[valveName];

      // console.log(`== Minute ${index} ==`);

      if (openValves.length) {
        // console.log('valves', openValves.join(','), 'is open, releasing', presureReleased, 'pressure');
      } else {
        // console.log('No valves are open');
      }


      // should I move or open
      if (open && openValves.indexOf(valveName) === -1) {
        // console.log('You open valve', valveName);
        // console.log('');
        openValves.push(valveName);
        presureReleased += valveRate;
      } else {
        if (valveIndex < (valves.length - 1)) {
          valveIndex += 1;
          // console.log('You move to valve', valves[valveIndex][0]);
        }
        // console.log('');
      }

      if (index < 30) {
        // add current pressure to total for this 30 min
        totalPreasureOut += presureReleased;
      }
    }

    return totalPreasureOut;
  };

  const optimal = [
    ['AA', 0],
    ['DD', 1],
    ['CC', 0],
    ['BB', 1],
    ['AA', 0],
    ['II', 0],
    ['JJ', 1],
    ['II', 0],
    ['AA', 0],
    ['DD', 0],
    ['EE', 0],
    ['FF', 0],
    ['GG', 0],
    ['HH', 1],
    ['GG', 0],
    ['FF', 0],
    ['EE', 1],
    ['DD', 0],
    ['CC', 1]
  ];

  // const pathScore = getPathScore(optimal)
  // const scoreMap = {};
  // const triedPaths = [JSON.stringify([['AA', 0]])];
  // const queue = [valves[0]];

  // while (queue.length > 0 && start) {
  //   let { valveName, caves } = queue.shift();

  //   caves.forEach(cave => {
  //     let movePath;
  //     let openPath;
  //     [...triedPaths].forEach((prevPath, index) => {
  //       const path = JSON.parse(prevPath);
  //       const lastNode = find(valves, { valveName: path[path.length - 1][0] });

  //       if (lastNode.caves.indexOf(cave) !== -1) {
  //         movePath = [...path, [cave, 0]];
  //         openPath = [...path, [cave, 1]];
  //         const movePathString = JSON.stringify(movePath);
  //         const openPathString = JSON.stringify(openPath);
  
  //         const moveTriedIndex = triedPaths.indexOf(movePathString);
  //         const openTriedIndex = triedPaths.indexOf(openPathString);
          
  //         if (moveTriedIndex === -1) {
  //           let moveNextScore = getPathScore(movePath);
  //           scoreMap[moveNextScore] = movePath;
  //           triedPaths.push(movePathString);
  //         } 
  
  //         if (openTriedIndex === -1) {
  //           let openNextScore = getPathScore(openPath);
  //           scoreMap[openNextScore] = openPath;
  //           triedPaths.push(openPathString);
  //         }
  //       }

  //     });

  //     if (movePath && movePath.length < 30 || openPath && openPath.length < 30) {
  //       queue.push(find(valves, { valveName: cave }));
  //     }

  //   });
  // }


  const  validPaths = [];
  function clone(A) {
    return JSON.parse(JSON.stringify(A));
  }

  const traverse = (node, open, path) => {
      if(node === undefined){
          node = RootNode;
      }
      if(path === undefined){
          path = [];
      }
      path.push(`${node.valveName}-${open}`);
      // console.log("Current Path", path);
      if(node.valveName === 'end' || path.length > 30){
        
        if (node.valveName === 'end' && validPaths.indexOf(JSON.stringify(path)) === -1) {
            console.log("Found validPaths", validPaths);
            validPaths.push(JSON.stringify(path));
          }
          return ;
      } else {

        node.caves.forEach(cave => {
            // var newPath = clone(path);
  
            traverse(find(valves, { valveName: cave }), 0, [...path]);
            traverse(find(valves, { valveName: cave }), 1, [...path]);
        });
      }
  }

  // start && traverse(valves[0], 0, []);

  console.log('The valid paths', validPaths);
  // console.log('The pathScore', pathScore);
  console.log('The allMustVisitCavesList', allMustVisitCaves);
  console.log('The allValvesMap', allValvesMap);
  console.log('The valves', valves);

  const links = [];
  valves.forEach(valve => {
    valve.caves.forEach(cave => {
      links.push ({
        source: valve.valveName,
        target: cave
      });
    });
  });
  const data = {
    nodes: valves.map(v => {
      return { id: v.valveName }
    }),
    links
  };

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={16} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <Button size="sm" onClick={() => setStart(!start)}>Start Stop</Button>
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div className="d-flex justify-content-around">
          <ForceGraph2D
            width={window.innerWidth / 2}
            height={650}
            graphData={data}
            nodeCanvasObjectMode={() => 'after'}
            nodeRelSize={10}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 14;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'white';
              ctx.fillText(label, node.x, node.y);
            }}
          />
          <ForceGraph3D
            width={window.innerWidth / 2}
            height={650}
            graphData={data}
            nodeCanvasObjectMode={() => 'after'}
            nodeRelSize={10}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 14;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'white';
              ctx.fillText(label, node.x, node.y);
            }}
          />
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day16;
