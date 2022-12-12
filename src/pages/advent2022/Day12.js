import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day12';

function Day12() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    return input.split('#');
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={12} year={2022}/>
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
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day12;
