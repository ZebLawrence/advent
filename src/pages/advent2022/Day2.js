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
  
  const getWin = set => {
    switch (set) {
      case 'A X':
      case 'B Y':
      case 'C Z':
      case 'A A':
      case 'B B':
      case 'C C':
        return 'alert-warning';
      case 'A Y':
      case 'B Z':
      case 'C X':
      case 'A B':
      case 'B C':
      case 'C A':
        return 'alert-success';
      case 'A Z':
      case 'B X':
      case 'C Y':
      case 'A C':
      case 'B A':
      case 'C B':
        return 'alert-danger';
    }
  };

  const getPlay = (cell, part2) => {
    switch (cell) {
      case 'A':
      case 'X':
        return '🤜';
      case 'B':
      case 'Y':
        return '🫳';
      case 'C':
      case 'Z':
        return '✌️';
      default:
        break;
    }
  };

  const getGoalPlay = (play, goal) => {
    if (play === 'A') {
      switch (goal) {
        case 'X': //lose
          return 'C';
        case 'Y': //draw
          return 'A';
        case 'Z': //win
          return 'B';
      }
    } else if (play === 'B') {
      switch (goal) {
        case 'X': //lose
          return 'A';
        case 'Y': //draw
          return 'B';
        case 'Z': //win
          return 'C';
      }
    } else if (play === 'C') {
      switch (goal) {
        case 'X': //lose
          return 'B';
        case 'Y': //draw
          return 'C';
        case 'Z': //win
          return 'A';
      }
    }
  };

  const getGoal = goal => {
    switch (goal) {
      case 'Y':
        return 'Draw';
      case 'X':
        return 'Lose';
      case 'Z':
        return 'Win';
    }
  };

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 2 2022" day={2} year={2022}/>
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
        <div className="d-flex justify-content-around">
          <table className="roshambo">
            <caption>Part 1</caption>
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Mine</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                puzzle && puzzle.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  const letters = row.split(' ');
                  const rowClass = getWin(row);
                  return (
                    <tr className={rowClass} key={rowKey}>
                      {
                        letters.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          const content = getPlay(cell);
                          return (
                            <td key={cellKey}>
                              {content}
                            </td>
                          );
                        })
                      }
                      <td>{scoreMap[row]}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <table className="roshambo">
            <caption>Part 2</caption>
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Goal</th>
                <th>Mine</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                puzzle && puzzle.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  const letters = row.split(' ');
                  const myPlay = getGoalPlay(letters[0], letters[1]);
                  const rowClass = getWin(`${letters[0]} ${myPlay}`);
                  return (
                    <tr className={rowClass} key={rowKey}>
                      <td>{getPlay(letters[0])}</td>
                      <td>{getGoal(letters[1])}</td>
                      <td>{getPlay(myPlay)}</td>
                      <td>{winLoseTieMap[row]}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day2;
