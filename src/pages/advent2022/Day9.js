import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import { take } from 'lodash';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample1,
  sample2,
  puzzle1
} from '../../puzzles/2022/day9';


class Knot {
  constructor() {
    this.positions = {
      '0-0': [0, 0]
    };
    this.coordinates = [0, 0];
    this.moves = [[0, 0]];
  }

  move(x, y) {
    // console.log('The move hit', x, y);
    this.coordinates = [x, y];
    this.moves.push([x, y]);
    this.positions[`${x}-${y}`] = [x, y];

    if (this.nextKnot) {
      // console.log('Telling the next knot the parent moved')
      this.nextKnot.parentMoved(this.coordinates);
    }
  }

  setNextKnot(nextKnot) {
    this.nextKnot = nextKnot;
  }

  shouldMove(parentX, parentY) {
    const [myX, myY] = [...this.coordinates];
    // left right and up down
    if ((Math.max(parentX, myX) - Math.min(parentX, myX) == 2) || (Math.max(parentY, myY) - Math.min(parentY, myY) == 2)) {
      return true;
    } else {
      return false;
    }
  };

  getNewCoordinates([parentX, parentY]) {
    // console.log('Get new child coordinates -----------------------------');
    // console.log('The parent is at ', parentX, parentY)
    const [myX, myY] = [...this.coordinates];
    let newX = myX;
    let newY = myY;
    // if the parent and I aren't touching and aren't in the same row or column, then I move one step diagonally to keep up

    const isOnSameCol = myX === parentX;
    const isOnSameRow = myY === parentY;
    const parentIsAbove = parentY > myY;
    const parentIsRight = parentX > myX;

    // needs to move up or down Y
    if (isOnSameCol && !isOnSameRow) {
      // move one up or down
      newY = parentIsAbove ? myY + 1 : myY - 1;
    } else if (!isOnSameCol && isOnSameRow) {
      // needs to move left or right X
      newX = parentIsRight ? myX + 1 : myX - 1;
    } else if (!isOnSameCol && !isOnSameRow) {
      // needs to move up down left or right diagonal
      if (parentIsAbove && parentIsRight) {
        // move up and to the right
        newX = myX + 1; 
        newY = myY + 1; 
      } else if (parentIsAbove && !parentIsRight) {
        // move up and to the left
        newX = myX - 1;
        newY = myY + 1;
      } else if (!parentIsAbove && parentIsRight) {
        // move down and to the right
        newX = myX + 1;
        newY = myY - 1;
      } else if (!parentIsAbove && !parentIsRight) {
        // move down and to the left
        newX = myX - 1;
        newY = myY -1;
      }
    }

    return ([newX, newY]);
  }

  parentMoved([x, y]) {
    // console.log('The parent moved to', x, y);
    // the parent knot has moved to x, y
    // should I move
    const shouldMove = this.shouldMove(x, y);
    // if I should move what are my new coordinates
    if (shouldMove) {
      const [newX, newY] = this.getNewCoordinates([x, y]);
      // if I should move pass new coordinates to 
      this.move(newX, newY);
    }
  }
}


function Day9() {
  const parsePuzzle = input => {
    return parseTextByLines(input).map(x => x.split(' '));
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const timeStart = Date.now();
 
  let headCoordinates = [0, 0];

  const knotCount = 10;
  const knots = [];

  for (let index = 0; index < knotCount; index += 1) {
    const knot = new Knot();
    knots.push(knot);
  }

  for (let index = 0; index < knotCount; index += 1) {
    const knot = knots[index];

    if (knots[index + 1]) {
      knot.setNextKnot(knots[index + 1]);
    }
  }


  const moveHead = (direction, steps) => {
    const [previousX, previousY] = [...headCoordinates];
    let newX = previousX;
    let newY = previousY;
    for (let index = 1; index <= steps; index += 1) {

        if (direction === 'R') {
          newX += 1;
        }
        if (direction === 'L') {
          newX -= 1;
        }
        if (direction === 'U') {
          newY += 1;
        }
        if (direction === 'D') {
          newY -= 1;
        }
        headCoordinates = [newX, newY];

        const [headKnot] = knots;
        headKnot.move(newX, newY);
    }
  }

  // const shortPuzzle = take(puzzle, 2);
  puzzle.forEach(([direction, steps]) => {
  // shortPuzzle.forEach(([direction, steps]) => {
    moveHead(direction, Number(steps));
  });

  
  const tailPositions = knots[knots.length - 1].positions;
  console.log('All knots', knots);
  console.log('All tail possitions after moves', knots[knots.length - 1]);

  // console.log('The puzzle', puzzle);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 8 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
        <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button>
        <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
        <br />
        Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:
      </Body>
      <Body>
        The tail was in {Object.keys(tailPositions).length} positions.
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day9;
