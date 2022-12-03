import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/2022/day1';


function Day1() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const timeStart = Date.now();
  let elves = [];

  let elf = 0;
  puzzle.forEach(foodItem => {
    if (foodItem === '') {
      elves.push(elf);
      elf = 0;
    } else {
      elf += Number(foodItem);
    }
  });
  elves.push(elf);

  elves = elves.sort((a, b) => { return b - a})
  console.log('the elves', elves);
  const [elf1, elf2, elf3] = elves;

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 1 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample))}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Puzzle 1</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
      </Body>
      <Body>
        Top 1
        <div className="elf">{elf1}</div>
        Top 3: {elf1 + elf2 + elf3}
        <div className="d-flex flex-wrap">
          <div className="elf">{elf1}</div>
          <div className="elf">{elf2}</div>
          <div className="elf">{elf3}</div>
        </div>
        All the little buggers
        <div className="d-flex flex-wrap">
          {
            elves.map(e => {
              return (<div className="elf">{e}</div>)
            })
          }
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day1;
