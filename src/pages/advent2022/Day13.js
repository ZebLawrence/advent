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
    return input.split('\n');
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));

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
          TBD
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
