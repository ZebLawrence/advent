import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day14';

function Day14() {
  const timeStart = Date.now();
  const sandSource = { rowIndex: 0, colIndex: 500,  source: true };
  let rowMin = 0;
  let rowMax = 0;
  let colMin = 500;
  let colMax = 500;
  const parsePuzzle = input => {
    return input.split('\n').map(wallPath => {
      return wallPath.split(' -> ').map(coord => {
        const [colIndex, rowIndex] = coord.split(',').map(n => Number(n));
        return {
          wall: true,
          rowIndex,
          colIndex
        };
      })
    });
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const [partTwo, setPartTwo] = useState(false);

  puzzle.forEach(row => { row.forEach(col => {
    const { rowIndex, colIndex } = col;
    rowMin = rowIndex < rowMin ? rowIndex : rowMin;
    rowMax = rowIndex > rowMax ? rowIndex : rowMax;
    colMin = colIndex < colMin ? colIndex : colMin;
    colMax = colIndex > colMax ? colIndex : colMax; 
  })});

  const wallsFilledIn = [...Array(rowMax + 3)].map(e => Array((colMax - colMin) + 3).fill('.'));
  wallsFilledIn[sandSource.rowIndex][(sandSource.colIndex - colMin) + 1] = '+';

  const wallMap = {};

  // fill in walls
  puzzle.forEach(wallPoints => {
    // console.log('the wallPoints', wallPoints)
    for (let index = 0; index < wallPoints.length - 1; index += 1) {
      const from = wallPoints[index];
      const to = wallPoints[index + 1];
      const { rowIndex: fromRow, colIndex: fromCol } = from;
      const { rowIndex: toRow, colIndex: toCol } = to;

      // horizontal line
      if (fromRow === toRow) {
        const length = Math.max(fromCol, toCol) - Math.min(fromCol, toCol);
        const colStart = (Math.min(fromCol, toCol) - colMin) + 1;

        for (let horzIndex = 0; horzIndex <= length; horzIndex += 1) {
          wallsFilledIn[fromRow][colStart + horzIndex] = '#';
          wallMap[`${fromRow}-${colStart + horzIndex}`] = true;
        }

      } else if (fromCol === toCol) { // vertical
        const length = Math.max(toRow, fromRow) - Math.min(toRow, fromRow);
        const rowStart = Math.min(toRow, fromRow);
        for (let vertIndex = 0; vertIndex <= length; vertIndex += 1) {
          wallsFilledIn[rowStart + vertIndex][(toCol - colMin) + 1] = '#';
          wallMap[`${rowStart + vertIndex}-${(toCol - colMin) + 1}`] = true;
        }
      }
    }
  });

  const sandIndex = wallsFilledIn[0].indexOf('+');
  const rowLength = wallsFilledIn[0].length;
  const colLength = wallsFilledIn.length;
  let addToLeft = (rowLength - sandIndex) > sandIndex;

  if (partTwo) {
    wallsFilledIn.forEach((row, ri) => {
      const toAdd = Math.ceil((Math.max(rowLength, colLength) + 2) / 2);

      if (addToLeft) {
        for (let index = 0; index < 159; index += 1) {
          row.unshift('.'); 
        }
        for (let index = 0; index <= 101; index += 1) {
          row.push('.'); 
        }
      } else {
        const newRightLength = (rowLength - sandIndex) + toAdd;
        const addToLeft = newRightLength - sandIndex;

        for (let index = 0; index < addToLeft; index += 1) {
          row.unshift('.'); 
        }
        for (let index = 0; index <= toAdd; index += 1) {
          row.push('.'); 
        }
      }
    });

    wallsFilledIn[rowMax + 2] = [...Array(wallsFilledIn[rowMax + 2].length).fill('#')];
  }

  let sandFellOut = 0;

  const sandFallingAt = (row, col) => {
    const down = wallsFilledIn[row + 1]?.[col];
    if (!down) {
      throw true;
    } else if (down === '.') { // below is air
      sandFallingAt(row + 1, col);
    } else if (down === '#' || down === 'o') { // check down left then down right
      const downLeft = wallsFilledIn[row + 1]?.[col - 1];
      const downRight = wallsFilledIn[row + 1]?.[col + 1];
      if (!downLeft || !downRight) {
        throw true;
      } else if (downLeft === '.') {
        sandFallingAt(row + 1, col - 1);
      } else if (downRight === '.') {
        sandFallingAt(row + 1, col + 1);
      } else if ((downLeft === '#' || downLeft === 'o') && (downRight === '#' || downRight === 'o')) { // draw sand
        wallsFilledIn[row][col] = 'o'
      }
    }
  }

  let totalSand = 0;

  while (sandFellOut < 2) {
    try {
      sandFallingAt(0, wallsFilledIn[0].indexOf('+'));
    } catch (sandReachbottom) {
      console.log('the falling result made it to the sandReachbottom', sandReachbottom);
      if (sandReachbottom) {
        sandFellOut += 1;
      }
    }
    console.log('sand falling loop');
    totalSand += 1;
  }

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={14} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            {/* <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button> */}
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <Button size="sm" onClick={() => setPartTwo(!partTwo)}>Part Two</Button>
          </FormGroup>
        </Form>
      </Body>
      <Body>
        Sand units before the abyss {totalSand - 2}
        <div>
          <table className={`map-table ${wallsFilledIn.length > 21 ? 'large' : ''}`}>
            <tbody>
              {
                wallsFilledIn.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((tile, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          let backgroundColor = '#fff';
                          let borderRadius = 0;
                          if (tile === '#') backgroundColor = '#000';
                          if (tile === '+' || tile === 'o') {
                            backgroundColor = '#cbaa32';
                            borderRadius = '100%';
                          };
                          return (
                            <td style={{ backgroundColor, borderRadius }} key={cellKey}>
                              {tile}
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

export default Day14;
