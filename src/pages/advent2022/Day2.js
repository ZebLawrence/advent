import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/2022/day2';
import '../../assets/home.scss';

function Day2() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const timeStart = Date.now();
  const scoreMap = {
    'A X': (1 + 3),
    'A Y': (2 + 6),
    'A Z': (3 + 0),
    'B X': (1 + 0),
    'B Y': (2 + 3),
    'B Z': (3 + 6),
    'C X': (1 + 6),
    'C Y': (2 + 0),
    'C Z': (3 + 3)
  };  
  const winLoseTieMap = {
    'A X': (3 + 0),
    'A Y': (1 + 3),
    'A Z': (2 + 6),
    'B X': (1 + 0),
    'B Y': (2 + 3),
    'B Z': (3 + 6),
    'C X': (2 + 0),
    'C Y': (3 + 3),
    'C Z': (1 + 6)
  };

  let myScore = 0;
  let strategyScore = 0;
  puzzle.forEach(set => {
    myScore += scoreMap[set];
    strategyScore += winLoseTieMap[set];
  });
  

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 2 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample))}>Sample</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button>
        {/* <Button onClick={() => setPuzzle(puzzle2)}>Puzzle 2</Button> */}
        <br />
        Part 1
        <div>
          A for Rock, B for Paper, and C for Scissors.
          X for Rock, Y for Paper, and Z for Scissors.
          1 for Rock, 2 for Paper, and 3 for Scissors.
          0 if you lost, 3 if the round was a draw, and 6 if you won.
        </div>
        Part 2
        <div>
          X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
        </div>
      </Body>
      <Body>
        My Score: {myScore}
        <br />
        Strategy 2 Score: {strategyScore}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day2;
