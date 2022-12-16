import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import findLongestPathWithLogs from './longestPath';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day16';

function Day16() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    const valves = {};
    input.split('\n').forEach(valveInfo => {
      let [valve, caves] = valveInfo.split(';')
      let [valveName, rate] = valve.replace('Valve ', '').replace(' has flow rate=', ':').split(':');
      caves = caves.replace(' tunnels lead to valves', '').replace(' tunnel leads to valve ', '').split(',').map(x => x.trim());

      valves[valveName] = {
        valveName,
        rate: Number(rate),
        caves
      };
    });

    return valves;
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  
  const graph = {
    'end':{}
  };

  Object.keys(puzzle).forEach(key => {
    const { valveName, rate, caves } = puzzle[key];
    graph[valveName] = {};

    caves.forEach(cave => {
      graph[valveName][cave] = puzzle[cave].rate;
    });
    graph[valveName]['end'] = 0;
  });

  const result = findLongestPathWithLogs(graph, 'AA', 'finish');

  console.log('The graph', graph);
  console.log('The puzzle', puzzle);
  console.log('The longest path', result);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={16} year={2022}/>
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

export default Day16;
