import React, { useState } from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';
import { flatten } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample1,
  sample2,
  puzzle1
} from '../../puzzles/2022/day9';
import Knot from './Knot';

function Day9() {
  const parsePuzzle = input => {
    return parseTextByLines(input).map(x => x.split(' '));
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const [knotCount, setKnotCount] = useState(10);
  const timeStart = Date.now();
 
  let headCoordinates = [0, 0];
  const knots = [];

  for (let index = 0; index < knotCount; index += 1) {
    const knot = new Knot();
    knots.push(knot);
  }

  for (let index = 0; index < knotCount; index += 1) {
    const knot = knots[index];

    if (knots[index + 1]) {
      knot.setNextKnot(knots[index + 1]);
    }
  }

  const moveHead = (direction, steps) => {
    const [previousX, previousY] = [...headCoordinates];
    let newX = previousX;
    let newY = previousY;
    for (let index = 1; index <= steps; index += 1) {

        if (direction === 'R') {
          newX += 1;
        }
        if (direction === 'L') {
          newX -= 1;
        }
        if (direction === 'U') {
          newY += 1;
        }
        if (direction === 'D') {
          newY -= 1;
        }
        headCoordinates = [newX, newY];

        const [headKnot] = knots;
        headKnot.move(newX, newY);
    }
  }

  puzzle.forEach(([direction, steps]) => {
    moveHead(direction, Number(steps));
  });

  const [headKnot] = knots;
  const headMoves = flatten(headKnot.moves);
  const edgeDistance = Math.max(...headMoves);
  console.log('the max distance', edgeDistance);
  const tailPositions = knots[knots.length - 1].positions;
  console.log('All tail possitions after moves', knots[knots.length - 1]);

  const rows = [];

  for (let ri = (edgeDistance * -1); ri <= edgeDistance; ri += 1) {
    const cells = [];
    const rowKey = `row-${ri}`;
    for (let ci = (edgeDistance * -1); ci <= edgeDistance; ci += 1) {
      const cellKey = `cell-${ri}-${ci}`;
      let cellClass = 'neutral-result';
      const wasHit = tailPositions[`${ci}-${(ri * -1)}`];
      if (wasHit) {
        cellClass = 'good-result';
      }
      cells.push(
        <td key={cellKey} className={cellClass}>
          {wasHit ? '🪢' : ''}
        </td>
      );
    }

    rows.push(<tr key={rowKey}>{cells}</tr>);
  }

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 8 2022" />
      <Body>
        <Form>
          <FormGroup>
            <Input
              name="select"
              type="select"
              defaultValue={knotCount}
              onChange={e => { setKnotCount(Number(e.currentTarget.value)); }}
            >
              <option value="2">Part 1: 2 Knots</option>
              <option value="10">Part 2: 10 knots</option>
            </Input>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
          </FormGroup>
        </Form>
        <br />
        Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:
      </Body>
      <Body>
        The rope with {knotCount} knots, the tail was in {Object.keys(tailPositions).length} positions.
        <div>
          <table class={`rope-table ${knotCount > 5 && puzzle.length > 8 ? 'smaller' : ''}`}>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day9;
