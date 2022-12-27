import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day25';

function Day25() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    const inputs = input.split('\n').map(line => {
      return line.split('').map(symbol => {
        if (!isNaN(symbol)) {
          return Number(symbol);
        } else {
          return symbol;
        }
      });
    });

    return {
      inputs
    }
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const puzzleClone = [...puzzle.inputs];
  const snafuTotals = [];
  const sumArray = (a, b) => { return a + b};

  puzzleClone.forEach(snafu => {
    const revOrd = snafu.reverse();
    let currentMultiple = 1;
    let lineTotal = 0;
    revOrd.forEach((ns, index) => {

      if(index > 0) {
        currentMultiple = currentMultiple * 5;
      }

      if(ns === '-') {
        lineTotal += currentMultiple * -1;
      } else if(ns === '=') {
        lineTotal += currentMultiple * -2;
      } else {
        lineTotal += currentMultiple * ns;
      }
    });

    snafuTotals.push([snafu.reverse().join(''), lineTotal]);
  });

  const snafuSum = snafuTotals && snafuTotals.map(ns => ns[1]).reduce((a, n) => a + n);
  const multiplesList = [];
  const symbols = [2, 1, 0, '-', '='];
  const tablekey = [];

  let multiple = 1;
  for (let index = 0; index < 21; index += 1) {
    if (index > 0) {
      multiple = multiple * 5;
    }
    multiplesList.push(multiple);
  }

  for (let index = 0; index < symbols.length; index += 1) {
    const element = symbols[index];
    const row = [];
    for (let ti = 0; ti < multiplesList.length; ti += 1) {
      const multiple = multiplesList[ti];
      if(element === '-') {
        row.push(multiple * -1);
      } else if(element === '=') {
        row.push(multiple * -2);
      } else {
        row.push(multiple * element);
      }
    }
    tablekey.push(row);
  }

  
  const calculateSnafuFromDecimal = decimal => {
    let places = [];
    for (let index = 0; index < multiplesList.length; index += 1) {
      const multiple = multiplesList[index];
      const mod = decimal % multiple;
      if (mod === decimal) {
        break
      } else {
        places.push(multiple);
      }
    }

    const newSnafuNumber = [];
    let remainingSnafu = decimal;
    places = places.reverse();
    //console.log('The places to use', places);
  
    for (let index = 0; index < places.length; index += 1) {
      console.log(`(${places.length - index}) == Place == (${places.length - index})`);
      const multipleAtPlace = places[index];
      // console.log('-------------------------------------------Remaining snafu', remainingSnafu)    
      // console.log('-------------------------------------------target snafu', decimal)
      // console.log('-------------------------------------------diff', remainingSnafu - decimal)
      // console.log('mutiples of', multipleAtPlace);
      const tableIndex = tablekey[1].indexOf(multipleAtPlace);
      const doubles = tablekey[0].slice(0, tableIndex);
      const singles = tablekey[1].slice(0, tableIndex);
      const minusSingles = tablekey[3].slice(0, tableIndex);
      const minusDoubles = tablekey[4].slice(0, tableIndex);
      if (doubles.length) {
  
        const doublesTotal = doubles.reduce(sumArray);
        const singlesTotal = singles.reduce(sumArray);
        const minusSinglesTotal = minusSingles.reduce(sumArray);
        const minusDoublesTotal = minusDoubles.reduce(sumArray);
        
        // console.log('doublesTotal', doublesTotal + multipleAtPlace)
        // console.log('singlesTotal', singlesTotal + multipleAtPlace)
        // console.log('minusSinglesTotal', minusSinglesTotal - multipleAtPlace)
        // console.log('minusDoublesTotal', minusDoublesTotal - multipleAtPlace)
  
        // set the starting position
        if (index === 0) {
          if ((multipleAtPlace + doublesTotal) < decimal) {
            newSnafuNumber.push(2);
            remainingSnafu = (multipleAtPlace * 2);
          } else {
            newSnafuNumber.push(1);
            remainingSnafu = multipleAtPlace;
          }
        } else {
          const diff = remainingSnafu - decimal;
          // have to subtract to get to target
          if (diff > 0) {
            const minusTwoDiff = Math.abs((remainingSnafu + (multipleAtPlace * -2)) - decimal);
            const minusOneDiff = Math.abs((remainingSnafu + (multipleAtPlace * -1)) - decimal);
            const minusZeroDiff = Math.abs((remainingSnafu + (multipleAtPlace * 0)) - decimal);
  
            if (minusTwoDiff < minusOneDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * -2);
              newSnafuNumber.push('=');
            } else if (minusTwoDiff > minusOneDiff && minusOneDiff < minusZeroDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * -1);
              newSnafuNumber.push('-');
            } else if (minusZeroDiff < minusTwoDiff && minusTwoDiff < minusOneDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * 0);
              newSnafuNumber.push(0);
            }
  
            // console.log('Diffs minusTwoDiff', minusTwoDiff)
            // console.log('Diffs minusOneDiff', minusOneDiff)
            // console.log('Diffs minusZeroDiff', minusZeroDiff)
            
          } else {
            // have to add to get to target
            const multiTwoDiff = Math.abs((remainingSnafu + (multipleAtPlace * 2)) - decimal);
            const multiOneDiff = Math.abs((remainingSnafu + (multipleAtPlace * 1)) - decimal);
            const multiZeroDiff = Math.abs((remainingSnafu + (multipleAtPlace * 0)) - decimal);
  
            if (multiTwoDiff < multiOneDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * 2);
              newSnafuNumber.push(2);
            } else if (multiTwoDiff > multiOneDiff && multiOneDiff < multiZeroDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * 1);
              newSnafuNumber.push(1);
            } else if (multiZeroDiff < multiTwoDiff && multiTwoDiff < multiOneDiff) {
              remainingSnafu = remainingSnafu + (multipleAtPlace * 0);
              newSnafuNumber.push(0);
            }
  
            // console.log('Diffs multiTwoDiff', multiTwoDiff)
            // console.log('Diffs multiOneDiff', multiOneDiff)
            // console.log('Diffs multiZeroDiff', multiZeroDiff)
          }
        }
  
  
  
      }
  
      //console.log('-------------------------------------------target snafu', decimal)
      //console.log('-------------------------------------------diff', remainingSnafu - decimal)
      // console.log('-------------------------------------------newSnafuNumber', newSnafuNumber)
      // console.log('-------------------------------------------remainingSnafu', remainingSnafu - decimal)
    }
  
    const leftOverOnes = (remainingSnafu - decimal);
    if (leftOverOnes > 0) {
      if (leftOverOnes === 2) {
        newSnafuNumber.push('=')
      } else if (leftOverOnes === 1) {
        newSnafuNumber.push('-')
      }
    } else {
      newSnafuNumber.push(leftOverOnes)
    }

    return newSnafuNumber.join('');
  };


  const decimalsToTest = [1,2,3,4,5,6,7,8,9,10,15,20,2022,12345,314159265];
  const decimalsToSnafuTestTable = [];

  decimalsToTest.forEach(d => {
    decimalsToSnafuTestTable.push([d, calculateSnafuFromDecimal(d)]);
  })

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={25} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <br />
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
        <div>New Snafu number {calculateSnafuFromDecimal(snafuSum)}</div>
        <div>
          {/* Multiples:  {[...multiplesList].join(', ')} */}
        <table>
          <thead>
            <tr>
              {[...multiplesList].map(h => {
                return(
                  <th key={h}>
                    {h}
                  </th>
                )
              })}
            </tr>
          </thead>
            <tbody>
              {
                tablekey && [...tablekey].map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          if (ci === 0) {
                            return (
                              <th key={cellKey}>
                                {cell}
                              </th>
                            );
                          } else {
                            return (
                              <td key={cellKey}>
                                {cell}
                              </td>
                            );
                          }
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <th>2=-1=0</th>
                <th>{snafuSum}</th>
              </tr>
            </tfoot>
          </table>
          (3125 * 2) + (625 * -2) + (125 * -1) + (25 * 1) + (5 * -2) + (1 * 0)
          <br />
          6250 - 1250 - 125 + 25 - 10 + 0
          <br />
          5000 - 125 + 25 - 10 + 0
          <br />
          4875 + 25 - 10 + 0
          <br />
          4900 - 10 + 0
          <br />
          4890 + 0 
          <br />
          4890
        </div>
      </Body>
      <Body>
        <div className="d-flex justify-content-center">
          <table>
            <thead>
              <tr>
                <th>SNAFU</th>
                <th>Decimal</th>
              </tr>
            </thead>
            <tbody>
              {
                snafuTotals && snafuTotals.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;

                          return (
                            <td key={cellKey}>
                              {cell}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <th>target: 2=-1=0</th>
                <th>{snafuSum}</th>
              </tr>
            </tfoot>
          </table>
          <table className="ml-5">
            <thead>
              <tr>
                <th>Decimal</th>
                <th>SNAFU</th>
              </tr>
            </thead>
            <tbody>
              {
                decimalsToSnafuTestTable && decimalsToSnafuTestTable.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;

                          return (
                            <td key={cellKey}>
                              {cell}
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

export default Day25;
