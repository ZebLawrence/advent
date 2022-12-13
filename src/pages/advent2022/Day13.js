import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day13';

function Day13() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    return input.split(':').map(rawPair => {
      let [left, right] = rawPair.split('\n').filter(x => x);
      left = JSON.parse(left);
      right = JSON.parse(right);
      return {
        left,
        right
      };
    });
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));

  let totalCorrectPairIndex = [];
  
  const isArray = thing => {
    return typeof thing === 'object';
  }

  const compareLeftRight = (left, right, result) => {
    console.log(' -Compare', left, 'vs', right);

    if (left.length === 0) {
      result.push(true);
      return result;
    } else {
      const compareIndex = Math.max(left.length, right.length);
      for (let index = 0; index < compareIndex; index += 1) {
        const leftItem = left[index] || null;
        const rightItem = right[index] || null;
  
        if (rightItem === null) {
          result.push(false);
          console.log('   -Right side ran out of items, so inputs are not in the right order');
          break;
        } else if (leftItem === null) {
          result.push(true);
          console.log('   - Left side ran out of items, so inputs are in the right order');
          break;
        } else {
          if (isArray(leftItem) || isArray(rightItem)) {
            const leftCompare = isArray(leftItem) ? leftItem : [leftItem];
            const rightCompare = isArray(rightItem) ? rightItem : [rightItem];
            compareLeftRight(leftCompare, rightCompare, result);
          } else {
  
            console.log(`   -(${index}) Compare`, leftItem, 'vs', rightItem);
            if (leftItem < rightItem) {
              result.push(true);
              console.log('   - Left side is smaller, so inputs are in the right order');
              break;
            } else if (leftItem > rightItem) {
              console.log('   -Right side is smaller, so inputs are not in the right order');
              result.push(false);
              break;
            }
          }
        }
        
      }

      
      return result;
    }


  }

  let total = 0;

  puzzle.forEach((packet, index) => {
    const { left, right } = packet;
    console.log(`== Pair ${index + 1} ==`);
    // TRY POPING THE FIRST LIST ITEM AND ONLY MOVING FWRD from there
    if (index === 8) {

      let setCompare = [];
      const something = compareLeftRight(left, right, setCompare);
      console.log('The return value', something);
  
      /// the return has way too many pushed into it see where breaks are missing
      if (setCompare.indexOf(true) > -1) {
        total += (index + 1);
      }
    }

  })

  // too low 5846
  // too high 10698
  console.log('The puzzle', puzzle);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={13} year={2022}/>
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
          Total correct packet pairs {total}
          <table className="map-table">
            <tbody>
              {/* {
                puzzle.heightMap.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((height, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          const colorVal = height * 9
                          let backgroundColor = `rgb(${colorVal}, ${colorVal},${colorVal})`;
                          return (
                            <td style={{ backgroundColor }} key={cellKey}>
                              {shortestPaths[ri][ci]}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              } */}
            </tbody>
          </table>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day13;
