import React, { useState } from 'react';
import { Button, Form, FormGroup, Alert } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day24';

class Blizzard {
  constructor(direction, row, col, maxX, maxY) {
    this.direction = direction;
    this.row = row;
    this.col = col;
    this.maxX = (maxX - 1);
    this.maxY = (maxY - 1);
    this.moveY = 0;
    this.moveX = 0;

    switch (this.direction) {
      case '<':
        this.moveX = -1;
        break;
      case '>':
        this.moveX = 1;
        break;
      case '^':
        this.moveY = -1;
        break;
      case 'v':
        this.moveY = 1;
        break;
      default:
        break;
    }
  }

  updatePositions(newRow, newCol) {
    this.row = newRow;
    this.col = newCol;
    if (!this.blizzardPositions[`${newRow}:${newCol}`]) {
      this.blizzardPositions[`${newRow}:${newCol}`] = [this.direction];
    } else {
      this.blizzardPositions[`${newRow}:${newCol}`].push(this.direction);
    }
  }

  setTables(table, blizzardPositions) {
    this.table = table;
    this.blizzardPositions = blizzardPositions;
    this.updatePositions(this.row, this.col);
  }

  moveStep() {
    const currentBlizzards = this.blizzardPositions[`${this.row}:${this.col}`];
    if (currentBlizzards && currentBlizzards.length > 0 && currentBlizzards.indexOf(this.direction) > -1) {
      // remove 1 if already there
      currentBlizzards.splice(currentBlizzards.indexOf(this.direction), 1);
    }
    let newRow = this.row + this.moveY;
    let newCol = this.col + this.moveX;
    if (newRow === this.maxY) {
      newRow = 1;
    } else if (newRow === 0) {
      newRow = this.maxY - 1;
    } else if (newCol === this.maxX) {
      newCol = 1;
    } else if (newCol === 0) {
      newCol = this.maxX - 1;
    }
    this.updatePositions(newRow, newCol);
  }
}

let goalReached = false;
let reachedAtSet = 0;

function Day24() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    return input.split('\n').map(line => {
      return line.split('');
    });
  };

  // let step = 0;
  const [step, setStep] = useState(325);
  const [puzzle, setPuzzle] = useState(parsePuzzle(puzzle1));
  const valley = [...puzzle];
  const potentialPaths = {};
  const blizzardPositions = {};
  const blizzards = [];

  puzzle.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (/v|\^|<|>/.test(cell)) {
        blizzards.push(new Blizzard(cell, ri, ci, row.length, puzzle.length));
      }
    });
  });
  blizzards.forEach(b => {
    b.setTables(valley, blizzardPositions);
  });

  const startCellIndex = puzzle[0].indexOf('.');
  const endCellIndex = puzzle[puzzle.length - 1].indexOf('.');
  const previousExpeditionPositions = [[[0, startCellIndex]]];


  const getCabDistance = (y, x) => {
    const distance = Math.abs(y - (puzzle.length - 1)) + Math.abs(x - endCellIndex);
    return distance;
  };

  const findExpeditionPaths = () => {
    // console.log(' searching expeditions at', step)
    const maxY = (puzzle.length - 1);
    const maxX = (puzzle[0].length - 1);
    const directions = [
      [1,0],
      [-1,0],
      [0,1],
      [0,-1],
      [0, 0]
    ];
    let newpossiblePositions = [];
    previousExpeditionPositions[previousExpeditionPositions.length - 1].forEach(([y, x]) => {

      directions.forEach(([addY, addX]) => {
        const searchY = y + addY;
        const searchX = x + addX;
        
        if ((searchY === puzzle.length - 1) && (endCellIndex === searchX) && !goalReached) {
          console.log('The goal is reached', goalReached);
          goalReached = true;
          reachedAtSet = step;
        }

        if (searchX > 0 && searchX < maxX && searchY > 0 && searchY < maxY) {
          const hasBlizzard = blizzardPositions[`${searchY}:${searchX}`] && blizzardPositions[`${searchY}:${searchX}`].length > 0;
  
          if (!hasBlizzard) {
            newpossiblePositions.push([searchY, searchX]);
          } 
        }
  
      })
    });

    newpossiblePositions.sort((a, b) => {
      return getCabDistance(a[0], a[1]) - getCabDistance(b[0], b[1]);
    });

    if (newpossiblePositions.length > 10000) {
      newpossiblePositions = newpossiblePositions.splice(0, Math.ceil(newpossiblePositions.length / 4));
    }

    // console.log('the sorted positions', newpossiblePositions);

    if (newpossiblePositions.length > 0) {
      previousExpeditionPositions.push(newpossiblePositions);
    }
  }

  // while (!goalReached) {

    for (let index = 0; index < step; index += 1) {
      blizzards.forEach(b => {
        b.moveStep();
      });
      findExpeditionPaths();
    }
    // step += 1;
    console.log('looping at step', step);
  // }


  // 328 too high
  // console.log('the blizzards', blizzards);
  console.log('the puzzle length Y', puzzle.length);
  console.log('the endCellIndex X', endCellIndex);
  console.log('the blizzardPositions', blizzardPositions);
  console.log('the previousExpeditionPositions', previousExpeditionPositions);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={24} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setStep(step + 1)}>Step + 1</Button>
            <br />
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <Alert color={goalReached ? 'success' : 'danger'}>
          {
            goalReached
              ? <span>Goal Reached at {reachedAtSet}</span>
              : <span>Not Reached</span>
          }
        </Alert>
        <div>Step: {step}</div>
        <div>
          <table className={`password-table large`}>
            <tbody>
              {
                valley && valley.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          let cellClass = '';
                          const cellKey = `cell-${ri}-${ci}`;
                          let content = /v|\^|<|>|\./.test(cell) ? '.' : '#';

                          if (potentialPaths[`${ri}:${ci}`]) {
                            cellClass = 'green';
                          }

                          if (blizzardPositions[`${ri}:${ci}`] && blizzardPositions[`${ri}:${ci}`].length){
                            if (blizzardPositions[`${ri}:${ci}`].length === 1) {
                              content = blizzardPositions[`${ri}:${ci}`][0];
                            } else {
                              content = blizzardPositions[`${ri}:${ci}`].length;
                            }
                          }

                          return (
                            <td className={cellClass} key={cellKey}>
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

export default Day24;
