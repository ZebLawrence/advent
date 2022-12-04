import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/day24';

class Alu {
  constructor(instructions, startInt) {
    this.w = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.startInt = startInt;
    this.instructions = instructions;

  }

  parseStartValue() {
    const [input] = this.instructions;
    const [inp, varLetter] = input.split(' ');
    this[varLetter] = Number(this.startInt);
    this.instructions.shift();
  }

  runInstructions() {
    this.instructions.forEach(instruction => {
      const [funcName, varA, varB] = instruction.split(' ');
      if (funcName === 'inp') {
        this.w = Number(varA);
      } else {
        let localB = isNaN(varB)
          ? this[varB]
          : Number(varB);
        
        this[funcName](this[varA], localB);
      }
    });
  }

  add(a, b) {
    this[a] = this[a] + b;
  }

  mul(a, b) {
    this[a] = this[a] * b;
  }

  div(a, b) {
    if (b !== 0) {
      this[a] = Math.floor(this[a] / b);
    }
  }

  mod(a, b) {
    if (this[a] >= 0 && b > 0) {
      this[a] = this[a] % b;
    }
  }

  eql(a, b) {
    this[a] = this[a] === b
      ? this[a] = 1
      : this[a] = 0;
  }
}


function Day24() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const timeStart = Date.now();

  console.log('the safetyGroups', puzzle);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 24 2021" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample))}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
        <br />
        info
      </Body>
      <Body>
        TBD
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day24;
