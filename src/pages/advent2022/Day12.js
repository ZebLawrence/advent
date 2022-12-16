import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import { findIndex } from 'lodash';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
  letters
} from '../../puzzles/2022/day12';

// https://qiao.github.io/PathFinding.js/visual/

function Day12() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    let startEndPos = {};
    const heightMap = input.split('\n')
      .map((line, indexY) =>
        line.split('').map((char, indexX) => {
        if (char === 'S') {
          startEndPos.startPos = { x: indexX, y: indexY };
          return Infinity;
        }
        if (char === 'E') {
          startEndPos.endPos = { x: indexX, y: indexY };
          return 26;
        } else {
          return letters.indexOf(char);
        }
      })
    );

    return { heightMap, ...startEndPos };
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));

  let heightMap = puzzle.heightMap;
  let endPos = puzzle.endPos;
  let startPos = puzzle.startPos;
  let visited = heightMap.map((line) => line.map(() => false));
  let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
  shortestPaths[endPos.y][endPos.x] = 0;

  let queue = [endPos];

  while (queue.length > 0) {
    let pos = queue.shift();
    visited[pos.y][pos.x] = true;

    let neighbors = [
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
    ];

    neighbors = neighbors.filter((neighbor) => {
      return heightMap[neighbor.y]?.[neighbor.x] !== undefined;
    });

    neighbors.forEach(neighbor => {
      let currHeight = heightMap[pos.y][pos.x];
      let nextHeight = heightMap[neighbor.y][neighbor.x];
      if (currHeight >= (nextHeight - 1)) {
        let shortestDist = shortestPaths[neighbor.y][neighbor.x] + 1;
        let currShortestDist = shortestPaths[pos.y][pos.x];
        shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
      }

      if (!visited[neighbor.y][neighbor.x] && currHeight <= nextHeight + 1) {
        queue.push(neighbor);
        visited[neighbor.y][neighbor.x] = true;
      }
    });
  }

  console.log(shortestPaths[startPos.y][startPos.x]);
  console.log('shortestPaths', shortestPaths);
  console.log('startPos', startPos);

  let pathIndexCount = shortestPaths[startPos.y][startPos.x];
  console.log('The puzzle', puzzle);

  // 530 529  (528)too high
  // 524 too high
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={12} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            {/* <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button> */}
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>
          Shortest steps = {shortestPaths[startPos.y][startPos.x]}
          <table className={`map-table ${puzzle.heightMap.length > 5 ? 'large' : ''}`}>
            <tbody>
              {
                puzzle.heightMap.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((height, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          const colorVal = height * 9
                          let backgroundColor = `rgb(${256 - colorVal}, ${colorVal },${colorVal + 160})`;
                          if (height === 0) {
                            backgroundColor = `rgb(${163}, ${12}, ${102})`;
                          } else if (height > 15 && height < Infinity) {
                            backgroundColor = `rgb(${colorVal - 50}, ${colorVal + 10},${colorVal + 10})`;
                          }
                          const content = shortestPaths[ri][ci] === Infinity ? '∞' : shortestPaths[ri][ci];
                          return (
                            <td className="map" title={content} style={{ backgroundColor }} key={cellKey}>
                              {content}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day12;
