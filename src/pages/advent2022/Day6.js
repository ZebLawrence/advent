import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import { uniq } from 'lodash';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  puzzle1
} from '../../puzzles/2022/day6';

function Day6() {

  const [puzzle, setPuzzle] = useState(sample1);
  const timeStart = Date.now();

  let lastFour = '';
  let lastFourteen = '';
  let found4Index = 0;
  let found14Index = 0;

  for (let index = 4; index < puzzle.length; index += 1) {
    const letters4 = puzzle.substring((index - 4), index);
    const unique4 = uniq(letters4.split(''));
    if (unique4.length === 4 && !found4Index) {
      lastFour = letters4;
      found4Index = index;
    }

    if (index > 13) {
      const letters14 = puzzle.substring((index - 14), index);
      const unique14 = uniq(letters14.split(''));
      if (unique14.length === 14 && !found14Index) {
        lastFourteen = letters14;
        found14Index = index;
      }    
    }

    if (found14Index && found4Index) {
      break;
    }
  }

  console.log('The puzzle', puzzle)
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 6 2022" day={6} year={2022}/>
      <Body>
        <Button size="sm" onClick={() => setPuzzle(sample1)}>Sample 1</Button>
        <Button size="sm" onClick={() => setPuzzle(sample2)}>Sample 2</Button>
        <Button size="sm" onClick={() => setPuzzle(sample3)}>Sample 3</Button>
        <Button size="sm" onClick={() => setPuzzle(sample4)}>Sample 4</Button>
        <Button size="sm" onClick={() => setPuzzle(sample5)}>Sample 5</Button>
        <Button size="sm" onClick={() => setPuzzle(puzzle1)}>Full Puzzle</Button>
        {/* <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button> */}
        <br />

      </Body>
      <Body>
        Marker <strong>{lastFour}</strong> found at <strong>{found4Index}</strong>
        <br />
        Message <strong>{lastFourteen}</strong> found at <strong>{found14Index}</strong>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day6;
