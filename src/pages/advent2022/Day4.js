import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/2022/day4';
import { ElfPairs } from './ElfPairs';

function Day4() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const timeStart = Date.now();

  const elfPairs = [];
  let containsAllPairs = 0;
  let overlappingAtAll = 0;
  puzzle.forEach(pair => {
    const [pair1, pair2] = pair.split(',');
    const [s1, e1] = pair1.split('-');
    const [s2, e2] = pair2.split('-');
    const start1 = Number(s1);
    const end1 = Number(e1);
    const start2 = Number(s2);
    const end2 = Number(e2);

    let containsAll = false;
    let overlapping = false;
    if (end1 >= start2) {
      if (end2 >= start1) {
        overlappingAtAll += 1;
        overlapping = true;
        const pair1Diff = end1 - start1;
        const pair2Diff = end2 - start2;
        
        let smaller = [];
        let larger = [];
        if (pair1Diff <= pair2Diff) {
          smaller = [start1, end1]
          larger = [start2, end2];
        } else {
          smaller = [start2, end2]
          larger = [start1, end1];
        }

        if ((larger[0] <= smaller[0]) && (larger[1] >= smaller[1])) {
          containsAllPairs += 1;
          containsAll = true;
        }
      }
    }

    elfPairs.push(<ElfPairs start1={start1} end1={end1} start2={start2} end2={end2} containsAll={containsAll} overlapping={overlapping} />);
  });

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 3 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample))}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
        <br />
        Contains All Pairs: 540
        <br />
        Overlapping at all: 872
      </Body>
      <Body>
        Contains All Pairs: {containsAllPairs}
        <br />
        Overlapping at all: {overlappingAtAll}
        <div>
          <span className="bad-result px-3">None overlapping</span>
          <span className="neutral-result px-3">Some overlapping</span>
          <span className="good-result px-3">All overlapping</span>
        </div>
        <div className="d-flex flex-wrap">
          {elfPairs}
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day4;
