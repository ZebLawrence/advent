import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { chunk, intersection } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/2022/day3';
import '../../assets/home.scss';

function Day3() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const timeStart = Date.now();

  const getItemValue = item => {
    return item.toUpperCase() === item
      ? item.charCodeAt(0) - 38
      : item.charCodeAt(0) - 96;
  };

  let misplacedScore = 0;
  puzzle.forEach(pack => {
    const [pocket1, pocket2] = chunk(pack.split(''), (pack.length / 2));
    const [sharedItem] = intersection(pocket1, pocket2);
    misplacedScore += getItemValue(sharedItem);
  });

  const safetyGroups = chunk(puzzle, 3);
  let sharedItemsScore = 0;
  safetyGroups.forEach(group => {
    const [elf1, elf2, elf3] = group;
    const [sharedItem] = intersection(elf1.split(''), elf2.split(''), elf3.split(''));
    sharedItemsScore += getItemValue(sharedItem);
  });

  console.log('the safetyGroups', safetyGroups);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 3 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample))}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
        <br />
        info
      </Body>
      <Body>
        Misplaced Items score: {misplacedScore}
        <br />
        Safety group shared item score: {sharedItemsScore}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day3;
