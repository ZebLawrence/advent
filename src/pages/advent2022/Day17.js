import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { createEmptyTetrisRow, Shape } from './TetrisShape';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day17';
import { Table3d } from '../../components/Table3d';

function Day17() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    return input.split('');
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const [step, setStep] = useState(10);
  // const [runTest, setRunTest] = useState(false);

  const tetrisTable = [
    createEmptyTetrisRow(true)
  ];

  let rocks = [
    [
      ['@','@','@','@']
    ],
    [
      ['.','@','.'],
      ['@','@','@'],
      ['.','@','.']
    ],
    [
      ['.','.','@'],
      ['.','.','@'],
      ['@','@','@']
    ],
    [
      ['@'],
      ['@'],
      ['@'],
      ['@']
    ],
    [
      ['@','@'],
      ['@','@']
    ]
  ];

  // const startingPuzzle = puzzle.join('');
  // const startingRockOrder = JSON.stringify(rocks)
  const windDirections = [...puzzle];

  const runFallingRockRoutine = (stepIndex) => {
    const shape = new Shape(rocks[0]);
    shape.setCurrentTable(tetrisTable);
    shape.addRock();
    let stillFalling = true;
    let cycleIndex = 0;
    let readyToRepeat = false;

    while (stillFalling) {
      cycleIndex += 1;
      // take from front
      const windDirection = windDirections.shift();
      if (windDirection === '<') {
        shape.moveLeft();
      } else if (windDirection === '>') {
        shape.moveRight();
      }
      // move to back
      windDirections.push(windDirection);

      shape.moveDown();

      if (!shape.isFalling) {
        stillFalling = false;
        // move current rock to back of list
        const thisRock = rocks.shift();
        rocks.push(thisRock);

        // print height and step when the rocks or the puzzle inputs repeat
        // const compareNewRockOrder = JSON.stringify(rocks);
        // const compareNewDirections = windDirections.join('');
        // if (compareNewRockOrder === startingRockOrder) {
        //   console.log('The rock order has started repeating at stepINdex at cycleIndex', stepIndex, cycleIndex);
        //   let topRockRow = -1;
        //   for (let index = 0; index < tetrisTable.length; index += 1) {
        //     if (tetrisTable[index].indexOf('#') > -1) {
        //       topRockRow = index;
        //       break;
        //     }
        //   }
        //   console.log('Current top rock height', (tetrisTable.length - topRockRow) - 1);
        // }
        // if (compareNewDirections === startingPuzzle) {
        //   console.error('The directions have started repeating at stepIndex, cycleIndex', stepIndex, cycleIndex);
        // }

        break;
      }
    }

    return readyToRepeat;
    // console.log('the rocks', rocks);
    // console.log('the wind movements to make at step', step, windDirections);
  }

  if (step < 60000) {
    // Run for number of steps
    for (let index = 0; index < step; index += 1) {
      runFallingRockRoutine(index + 1);
    }
  }

  // find repeat
  // let foundRepeat = false;
  // let testIndex = 0;
  // while (!foundRepeat && runTest) {
  //     testIndex += 1;

  //     const result = runFallingRockRoutine(testIndex);

  //     if (result) {
  //       foundRepeat = true;
  //       break;
  //     }
  // }

  // height
  // 210 - 1950 = 1740 steps per section
  // 3111 - 357 = 2754 height per section
  // (574,712,643 * 1740) + 210 = 999,999,999,030
  // (999,999,999,030 - 1000000000000) = 970 should give us the steps left over to add
  // 970 steps = 1522 height
  // final (357 + (2754 * 574712643)) + 1522

  let topRockRow = -1;
  for (let index = 0; index < tetrisTable.length; index += 1) {
    if (tetrisTable[index].indexOf('#') > -1) {
      topRockRow = index;
      break;
    }
  }

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={17} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
            Part 1
            <br />
            <Button size="sm" onClick={() => setStep(2022)}>2022 steps</Button>
            <Button size="sm" onClick={() => setStep(step + 1)}>+1 Step</Button>
            <br />
            Part 2
            <br />
            <Button size="sm" onClick={() => setStep(210)}>210 steps</Button>
            <Button size="sm" onClick={() => setStep(1180)}>1180 steps</Button>
            <Button size="sm" onClick={() => setStep(1950)}>1950 steps</Button>
            <Button size="sm" onClick={() => setStep(3690)}>3690 steps</Button>
            <Button size="sm" onClick={() => setStep(5 * puzzle.length)}>{5 * puzzle.length} steps</Button>
            <Button size="sm" onClick={() => setStep(1000000000000)}>1000000000000 steps</Button>
          </FormGroup>
          <div>At step {step}</div>
        </Form>
      </Body>
      <Body>
        <div>
          { step < 1000000000000 && `The height of the rocks ${(tetrisTable.length - topRockRow) - 1}`}
          <br />
          {step === 1000000000000 && `The height of the rocks ${(357 + (2754 * 574712643)) + 1522}`}
        </div>
        <div className="d-flex justify-content-center">
          <table className={`tetris-table large`}>
            <tbody>
              {
                step < 1000000000000 && tetrisTable.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          let cellIcon = cell;
                          if (cell === '#') {
                            cellIcon = '🪨';
                          } else if (cell === '_' || cell === '|') {
                            cellIcon = '🧱';
                          } else if (cell === '.') {
                            cellIcon = ''
                          }
                          return (
                            <td key={cellKey}>
                              {cellIcon}
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
          {/* <div style={{ height: '100%', width: '25%' }}> */}
            {/* <Table3d
              tableData={tetrisTable}
              viewPosition={[10, (tetrisTable.length * -1), tetrisTable.length]}
              zHeight={cellVal => {
                if (cellVal === '|' || cellVal === '#') {
                  return 2;
                }
                return 1;
              }}
              drawCell={cellVal => {
                if (cellVal === '|' || cellVal === '#') {
                  return true;
                }
                return false;
              }}
            />           */}
          {/* </div> */}
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day17;
