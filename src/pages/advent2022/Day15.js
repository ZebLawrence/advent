import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day15';

function Day15() {
  const timeStart = Date.now();

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
  
  console.log('The puzzle', puzzle);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={15} year={2022}/>
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
        TBD
        <div>
          <table className={`map-table`}>
            <tbody>
              {/* {
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
              } */}
            </tbody>
          </table>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day15;
