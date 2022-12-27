import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { find } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';

function Day22() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    let instructions = [];
    const map = [];
    const cols = [];
    let maxX = 0;
    let maxY = 0;
    const lines = input.split(/\n|\r\n/).filter(Boolean);
    maxY = lines.length - 1;
    lines.forEach((line, index) => {
      let letters = line.split('');
      if (index !== lines.length - 1) {
        maxX = Math.max(letters.length, maxX);
      }

      if(index === lines.length - 1) {
        // letters = '10R3L2'.split('');
        //letters = '10R5R1L2R1L4L4L3R3R2R1R1'.split('');
        // letters = '10R5L5R10'.split('');
        // letters = '10R5L5R2L2L5'.split('');
        // letters = '10R5L5R10L4R5'.split('');
        // letters = '10R5L5R10L4R5L5'.split('');
        let tempNum = [];
        letters.forEach((letter, li) => {
          if (!isNaN(letter)) {
            tempNum.push(Number(letter));
            if (li === (letters.length - 1)) {
              instructions.push([Number(tempNum.join(''))]);
            } 
          } else {
            instructions.push([Number(tempNum.join('')), letter]);
            tempNum = [];
          }
        });
      } else {
        map.push(letters);
      }
    });

    console.log('the maxX, maxY', maxX, maxY)

    map.forEach(row => {
      if(row.length < maxX) {
        const diff = maxX - row.length;
        for (let index = 0; index < diff; index += 1) {
          row.push(' ');     
        }
      }
      row.forEach((cell, index) => {
        if(!cols[index]) {
          cols.push([cell]);
        } else {
          cols[index].push(cell);
        }
      });
    });

    return ({
      map,
      cols,
      instructions
    })
  };

  const [puzzle1, setPuzzle1] = useState('');
  const [sample1, setSample1] = useState('');
  const [puzzle, setPuzzle] = useState('');
  
  useEffect(() => {
    async function makeCall() {
      const sample1Response = await fetch('../day22Sample.txt').then(r => r.text());
      const puzzle1Response = await fetch('../day22.txt').then(r => r.text());
  
      setPuzzle1(puzzle1Response);
      setSample1(sample1Response);
      setPuzzle(parsePuzzle(sample1Response));
    }
    makeCall();
  }, []);

  const getDirectionValue = (current, direction) => {
    const add = direction === 'R' ? 1 : -1;
    if (current + add === 4) {
      return 0;
    } else if (current + add === -1) {
      return 3
    } else {
      return current + add;
    }
  }

  const visitedMap = {};

  const searchRight = (row, startIndex, steps, rowIndex) => {
    let resultIndex = startIndex;
    let startSteps = steps;
    // console.log('   The searchRight steps', steps);
    for (let index = startIndex; index < (startIndex + steps + 1); index += 1) {
      const cellIndex = index % row.length;
      visitedMap[`${rowIndex}:${cellIndex}`] = '>';
      const cell = row[cellIndex];
      const nextCell = row[(index + 1) % row.length];
      resultIndex = cellIndex;
      
      // console.log('   The searchRight startSteps', startSteps);
      // console.log('   The searchRight cellIndex', cellIndex);
      // console.log('   The searchRight cell', cell);
      // console.log('   The searchRight nextCell', nextCell);
      if (nextCell === '#' || cell === '#' || startSteps === 0) {
        break;
      }

      if (nextCell === ' ' || cell === ' ') {
        const nextStart = row.indexOf('.');
        const nextWall = row.indexOf('#');
      //  console.log('the nextStart', nextStart)
      //  console.log('the nextWall', nextWall)
        if (nextStart < nextWall || nextWall === -1 && nextStart > -1) {
          index = nextStart - 1;
        } else {
        //  console.log('Breaking at found wall', index)
          break;
        }
      }

      startSteps -= 1;
    }
    return resultIndex;
  }

  const searchLeft = (row, startIndex, steps, rowIndex) => {
    let resultIndex = startIndex;
    let startSteps = steps;
    const rowCopy = [...row].reverse();
    // console.log('the revers searchLeft rowCopy', rowCopy)
    for (let index = ((row.length - 1) - startIndex); index < (startIndex + steps + 1); index += 1) {
      const cellIndex = index % row.length;
      const realColIndex = (row.length - 1) - cellIndex;
      visitedMap[`${rowIndex}:${realColIndex}`] = '<';
      const cell = rowCopy[cellIndex];
      let nextCell = rowCopy[(index + 1) % row.length];
      resultIndex = realColIndex;

      // console.log('   The searchLeft startSteps', startSteps);
      // console.log('   The searchLeft cellIndex', cellIndex);
    //  console.log('   The searchLeft cell', cell);
    //  console.log('   The searchLeft nextCell', nextCell);

      if (nextCell === '#' || cell === '#' || startSteps === 0) {
        break;
      }     

      if (nextCell === ' ' || cell === ' ') {
        const nextStart = rowCopy.indexOf('.');
        const nextWall = rowCopy.indexOf('#');
      //  console.log('the nextStart', nextStart)
      //  console.log('the nextWall', nextWall)
      if (nextStart < nextWall || nextWall === -1 && nextStart > -1) {
          index = nextStart - 1;
        } else {
        //  console.log('Breaking at found wall', index)
          break;
        }
      }
      

      startSteps -= 1;
    }
    return resultIndex;
  }

  const searchDown = (col, startIndex, steps, colIndex, inIndex) => {
    let resultIndex = startIndex;
    let startSteps = steps;
    // console.log('   The searchDown steps', steps);
    for (let index = startIndex; index < (startIndex + steps + 1); index += 1) {
      const cellIndex = index % col.length;
      visitedMap[`${cellIndex}:${colIndex}`] = inIndex || 'v';
      const cell = col[cellIndex];
      let nextCell = col[(index + 1) % col.length];
      resultIndex = cellIndex;
      
      // console.log('   The searchDown startSteps', startSteps);
      // console.log('   The searchDown cellIndex', cellIndex);
      // console.log('   The searchDown cell', cell);
      // console.log('   The searchDown nextCell', nextCell);
     
      if (nextCell === '#' || cell === '#' || startSteps === 0) {
      //  console.log('Breaking at', index)
        break;
      }

      if (nextCell === ' ' || cell === ' ') {
        const nextStart = col.indexOf('.');
        const nextWall = col.indexOf('#');
      //  console.log('the nextStart', nextStart)
      //  console.log('the nextWall', nextWall)
      if (nextStart < nextWall || nextWall === -1 && nextStart > -1) {
          index = nextStart - 1;
        } else {
        //  console.log('Breaking at found wall', index)
          break;
        }
      }
      

      startSteps -= 1;
    }
    return resultIndex;
  }

  const searchUp = (col, startIndex, steps, colIndex) => {
    let resultIndex = startIndex;
    let startSteps = steps;
    const colCopy = [...col].reverse();
    // console.log('the searchUp colCopy', colCopy);
    for (let index = ((col.length - 1) - startIndex); index < (startIndex + steps + 1); index += 1) {
      const cellIndex = index % col.length;
      const realRowIndex = (col.length - 1) - cellIndex;
      visitedMap[`${realRowIndex}:${colIndex}`] = '^';
      const cell = colCopy[cellIndex];
      let nextCell = colCopy[(index + 1) % col.length];
      resultIndex = realRowIndex;

      if (nextCell === '#' || cell === '#' || startSteps === 0) {
        break;
      }

      if (nextCell === ' ' || cell === ' ') {
        const nextStart = colCopy.indexOf('.');
        const nextWall = colCopy.indexOf('#');
      //  console.log('the nextStart', nextStart)
      //  console.log('the nextWall', nextWall)
      if (nextStart < nextWall || nextWall === -1 && nextStart > -1) {
          index = nextStart - 1;
        } else {
        //  console.log('Breaking at found wall', index)
          break;
        }
      }
      

      startSteps -= 1;
    }
    return resultIndex;
  }

  const { instructions, map, cols } = puzzle;
  const mapClone = map && [...map];
  let currentCol;
  let currentRow;
  let currentDirection;
  if (puzzle) {
    const startCellIndex = map && map[0].indexOf('.');
    currentCol = startCellIndex;
    currentRow = 0;
    currentDirection = 0;

    instructions.forEach(([steps, direction], inIndex) => {
      // console.log('steps', steps);
      // console.log('direction', direction);
      // console.log('currentRow', currentRow);
      // console.log('currentCol', currentCol);

      const row = mapClone[currentRow];
      const col = cols[currentCol];

      // console.log('the col', col);

      if (currentDirection === 0) {
        currentCol = searchRight(row, currentCol, steps, currentRow);   
      } else if (currentDirection === 2) {
        currentCol = searchLeft(row, currentCol, steps, currentRow)
      } else if (currentDirection === 1) {
        currentRow = searchDown(col, currentRow, steps, currentCol);
      } else if (currentDirection === 3) {
        currentRow = searchUp(col, currentRow, steps, currentCol);
      } else {
        console.error('The current direction is not found', currentDirection);
      }

      if (direction) {
        currentDirection = getDirectionValue(currentDirection, direction);
      }


    });

  
    console.log('visitedMap', visitedMap);
    console.log('startCellIndex', startCellIndex);
    console.log('cols', cols);
    console.log('puzzle', puzzle);
    console.log('mapClone', mapClone);
    console.log('currentRow', currentRow);
    console.log('currentCol', currentCol);
  }
  // wrong 35230
  // 190054 too high
  // 173022 wrong
  // 173021 wrong
  // test running off the top of the bottom right of the table

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={22} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>
          <div>
            {/* {instructions && instructions.join('')} */}
          </div>
          <table className={`password-table large`}>
            <tbody>
              {
                mapClone && mapClone.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          let cellClass = '';
                          if (cell === ' ') {
                            cellClass = 'noborder';
                          }
                          const cellKey = `cell-${ri}-${ci}`;
                          const finish = currentCol === ci && currentRow === ri;
                          let content = cell;
                          if (visitedMap[`${ri}:${ci}`]) {
                            content = visitedMap[`${ri}:${ci}`];
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
          <div>
            Ended at:
            <br />
            Row: {currentRow + 1}
            <br />
            Col: {currentCol + 1}
            <br />
            Direction: {currentDirection}
            <br />
            Total: {(1000 * (currentRow + 1)) + (4 * (currentCol + 1)) + currentDirection}
          </div>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day22;
