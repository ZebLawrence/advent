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
    this.startInt = `${startInt}`;
    this.instructions = instructions;
    this.index = 0;
  }

  runInstructions() {
    this.instructions.forEach(instruction => {
      const [funcName, varA, varB] = instruction.split(' ');
      if (funcName === 'inp') {
        // console.log(`Setting ${varA} to`, Number(this.startInt[this.index]));
        this[varA] = Number(this.startInt[this.index]);
        this.index += 1;
      } else {
        let localB = isNaN(varB)
          ? this[varB]
          : Number(varB);
        // console.log('Calling', funcName, varA, localB);
        // console.log('This', this);
        this[funcName](varA, localB);
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
  let validModel = null;
  // for (let index = 99999999999999; index > 0; index -= 1) {
  //   const numString = `${index}`;
    
  //   if (numString.indexOf('0') === -1) {
  //     const alu = new Alu(puzzle, 13579246899999);
  //     alu.runInstructions();

  //     if (alu.z === 0) {
  //       console.log('Valid', index);
  //       validModel = index;
  //       break;
  //     } else {
  //       console.log('Not valid', index);
  //     }
  //   }
  // }

  const alu = new Alu(puzzle, 91398299697996);
  alu.runInstructions();

  console.log('--------------------------------');
  console.log('the instructions', puzzle);
  console.log('the validModel', alu);

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
        Valid model number: {validModel}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day24;
