import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day7';

function Day7() {

  const [puzzle, setPuzzle] = useState(sample1);
  const timeStart = Date.now();

  console.log('The puzzle', puzzle)
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 7 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(sample1)}>Sample 1</Button>
        {/* <Button size="sm" onClick={() => setPuzzle(sample2)}>Sample 2</Button>
        <Button size="sm" onClick={() => setPuzzle(sample3)}>Sample 3</Button>
        <Button size="sm" onClick={() => setPuzzle(sample4)}>Sample 4</Button>
        <Button size="sm" onClick={() => setPuzzle(sample5)}>Sample 5</Button> */}
        <Button size="sm" onClick={() => setPuzzle(puzzle1)}>Full Puzzle</Button>
        {/* <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button> */}
        <br />
      </Body>
      <Body>
        TBD
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day7;
