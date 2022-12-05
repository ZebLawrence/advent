import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/2022/day5';

function Day5() {

  const [puzzle, setPuzzle] = useState(sample);
  const timeStart = Date.now();

  const stacksState1 = {...puzzle.stacks};
  const stacksState2 = {...puzzle.stacks2};
  let moves = parseTextByLines(puzzle.moves);
  
  function parseMove(move) {
    return move.replace('move ', '')
      .replace(' from ', ',')
      .replace(' to ', ',')
      .split(',')
      .map(n => Number(n));
  }

  function performMoves(state, count, from, to, multiple) {
    if (multiple) {
      const cratesToMove = state[from].slice(-count);
      state[from].splice(-count, count);
      state[to] = [...state[to],...cratesToMove];
    } else {
      for (let index = 0; index < count; index++) {
        const crate = state[from].pop();
        state[to].push(crate);
      }
    }
  }

  moves.forEach(move => {
    const moveInput = parseMove(move);
    performMoves(stacksState1, ...moveInput);
  });

  const topCrates1 = Object.keys(stacksState1).map(key => {
    const stack = stacksState1[key];
    return stack[stack.length - 1];
  });

  moves.forEach(move => {
    const moveInput = parseMove(move);
    performMoves(stacksState2, ...moveInput, true);
  });

  const topCrates2 = Object.keys(stacksState2).map(key => {
    const stack = stacksState2[key];
    return stack[stack.length - 1];
  });

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 3 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(sample)}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(puzzle1)}>Full Puzzle</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
        <br />
        info
      </Body>
      <Body>
        Crates on top part 1: {topCrates1}
        <table>
          
        </table>
        <br />
        Crates on top part 2: {topCrates2}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day5;
