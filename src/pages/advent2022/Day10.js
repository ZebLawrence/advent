import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { chunk, indexOf } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample1,
  sample2,
  puzzle1
} from '../../puzzles/2022/day10';

function Day10() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    return parseTextByLines(input).map(x => {
      const [command, value] = x.split(' ');
      return ([command, Number(value)]);
    });
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample2));
 
  let cycleIndex = 0;
  let register = 1;
  const cyclesToCheck = [20, 60, 100, 140, 180, 220];
  const cyclesToRender = [40, 80, 120, 160, 200, 240];
  const countsByCyle = {};
  const screenByCycle = [];
  let pixelOneIndex = 0;
  let tempLine = [];

  const calculateSignalStrength = () => {
    if (cyclesToCheck.indexOf(cycleIndex) > -1) {
      countsByCyle[cycleIndex] = register * cycleIndex;
    }
  };

  const renderPixel = () => {
    const spritePosition = [(register - 1), register, (register + 1)];

    if (spritePosition.indexOf((cycleIndex - pixelOneIndex)) > -1) {
      tempLine.push('#');
    } else {
      tempLine.push(' ');
    }
    if (cyclesToRender.indexOf(cycleIndex) > -1) {
      pixelOneIndex = (cycleIndex + 1);
      screenByCycle.push(tempLine);
      tempLine = [];
    }
  };

  puzzle.forEach(line => {
    const [command, value] = line;
    
    if (command === 'noop') {
      cycleIndex += 1;
      renderPixel();
      calculateSignalStrength();

    } else if (command === 'addx') {
      cycleIndex += 1;
      renderPixel();
      calculateSignalStrength();
      
      cycleIndex += 1;
      renderPixel();
      calculateSignalStrength();
      
      register = register + value;
    }
    console.log('looping');
  });

  let signalStrengths = 0;
  Object.keys(countsByCyle).forEach(key => {
    signalStrengths += countsByCyle[key];
  })

  console.log('The screen', screenByCycle);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 10 2022" />
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
          </FormGroup>
        </Form>
        <br />
        info
      </Body>
      <Body>
        The sum of the {cyclesToCheck.join(',')} cycles is: {signalStrengths}
        <br />
        <div>
          <table className="crt-table">
            <tbody>
              {
                screenByCycle.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((pixel, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          return (
                            <td key={cellKey}>
                              {pixel}
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

export default Day10;
