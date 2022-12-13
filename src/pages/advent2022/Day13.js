import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day13';
import { indexOf } from 'lodash';

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

  const compareLeftRight = (left, right, log = false) => {
    log &&console.log(' -Compare', left, 'vs', right);
    if (left === undefined) {
      log && console.log('   - Left side ran out of items, so inputs are in the right order');
      throw true;
    } else if (right === undefined) {
      log && console.log('   -Right side ran out of items, so inputs are not in the right order');
      throw false;
    } else if (isArray(left) || isArray(right)) {
      // log && console.log('found array, breaking into values', left, right);
      const leftList = isArray(left) ? left : [left];
      const rightList = isArray(right) ? right : [right];
      const compareLength = Math.max(leftList.length, rightList.length);

      for (let index = 0; index < compareLength; index += 1) {
        const leftItem = leftList.shift();
        const rightItem = rightList.shift();
        // log && console.log('inside the for loop at', index, 'of', compareLength);
        compareLeftRight(leftItem, rightItem, log);
      }
    } else {
      if (left < right) {
        log && console.log('   - Left side is smaller, so inputs are in the right order');
        throw true;
      }
      if (left > right) {
        log && console.log('   -Right side is smaller, so inputs are not in the right order');
        throw false;
      }
    }
  }

  let total = 0;

  const allPackets = [];

  // Part one
  puzzle.forEach(async (packet, index) => {
    const { left, right } = packet;
    const leftClone = JSON.stringify(left);
    const rightClone = JSON.stringify(right);
    // console.log(`== Pair ${index + 1} ==`);
    // console.log(' -Compare', leftClone, 'vs', rightClone);

      try {
        const something = compareLeftRight(left, right);
        console.error('The return value not caught', something);
        
      } catch (result) {
        if (result) {
          total += (index + 1);

          allPackets.push(leftClone, rightClone);
        } else {
          allPackets.push(rightClone, leftClone);
        }
      }
  })


  // push the divider packets
  allPackets.push('[[2]]', '[[6]]');
  
  console.log('The allPackets', allPackets);
  
  const allPacketsSorted = allPackets.sort((left, right) => {
    // console.log('Attempting to sort', left, 'vs', right);

    try {
      const something = compareLeftRight(JSON.parse(left), JSON.parse(right));
      console.error('The return value not caught', something);
      
    } catch (result) {
      // console.log('The sort result', result);
      
      if (result) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  const dividerOneIndex = allPacketsSorted.indexOf('[[2]]') + 1;
  const dividerTwoIndex = allPacketsSorted. indexOf('[[6]]') + 1;

  console.log('allPacketsSorted', allPacketsSorted);
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
          <br />
          Divider index total {dividerOneIndex * dividerTwoIndex}
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
