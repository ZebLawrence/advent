import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day20';

function Day20() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    return input.split('\n').map(Number);
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  
  const mixing = (inputs, rounds = 1, key = 1) => {
    // multiply by key for part 2
    inputs = inputs.map(v => [v * key]);
    const copy = [...inputs];
    for (let index = 0; index < rounds; index += 1) {
      inputs.forEach(val => {
        const previousIndex = copy.indexOf(val);
        copy.splice(previousIndex, 1);
        const newIndex = ((previousIndex + val[0]) % copy.length);
        copy.splice(newIndex, 0, val);
      }); 
    }

    return copy.map(x => x[0]);
  };


  const getCoords = (mixed, zeroIndex) => {
    return [1000, 2000, 3000]
      .map(val => (val + zeroIndex) % mixed.length)
      .map(index => mixed[index]);
  };

  const mixingResultPart1 = mixing(puzzle);
  const part1Coords = getCoords(mixingResultPart1, mixingResultPart1.indexOf(0));

  const mixingResultPart2 = mixing(puzzle, 10, 811589153);
  const part2Coords = getCoords(mixingResultPart2, mixingResultPart2.indexOf(0));

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={20} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>
          Part 1: {part1Coords[0]} + {part1Coords[1]} + {part1Coords[2]} 
          <br />
          Total: {part1Coords[0] + part1Coords[1] + part1Coords[2]}
          <br />
          Part 2: {part2Coords[0]} + {part2Coords[1]} + {part2Coords[2]} 
          <br /> 
          Total: {part2Coords[0] + part2Coords[1] + part2Coords[2]}
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day20;
