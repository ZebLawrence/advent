import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import { last } from 'lodash';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day8';

function Day8() {
  const parsePuzzle = input => {
    return parseTextByLines(input).map(x => x.split('').map(n => Number(n)));
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const timeStart = Date.now();
  const rows = [];
  const cols = [];

  // pre pivot columns 
  puzzle.forEach((row, ri) => {
    row.forEach((cell, ci) => {

      if (!rows[ri]) {
        rows.push([cell]);
      } else {
        rows[ri].push(cell);
      }

      if (!cols[ci]) {
        cols.push([cell]);
      } else {
        cols[ci].push(cell);
      }
      
    });
  });

  const treesInView = (trees, height) => {
    let treesInView = [0];
    for (let index = 0; index < trees.length; index += 1) {
      const tree = trees[index];

      treesInView.push(tree);
      if (tree >= height) {
        break;
      }
    }
    return (treesInView.length - 1) || 1;
  }

  const lookLeftRight = ([ri, ci], height) => {
    const row = [...rows[ri]];
    const leftTrees = row.slice(0, ci).reverse();
    const leftViewCount = treesInView(leftTrees, height);
    const rightTrees = row.slice(ci + 1);
    const rightViewCount = treesInView(rightTrees, height);

    return {
      isLeftRightVisible: Math.max(...leftTrees) < height || Math.max(...rightTrees) < height,
      leftViewCount,
      rightViewCount
    };
  }

  const lookUpDown = ([ri, ci], height) => {
    const col = [...cols[ci]];

    const upTrees = col.slice(0, ri).reverse();
    const upViewCount = treesInView(upTrees, height);
    const downTrees = col.slice(ri + 1);
    const downViewCount = treesInView(downTrees, height);

    return {
      isVisibleUpDown: Math.max(...upTrees) < height || Math.max(...downTrees) < height,
      upViewCount,
      downViewCount
    };
  }

  let visibleTrees = 0;
  let highestSenicScore = 0;
  // add the edgeTrees | top plus bottom plus sides
  visibleTrees += (puzzle[0].length * 2) + ((puzzle.length - 2) * 2);

  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const coordinates = [ri, ci];

        // should be one row in
        if ((ri > 0 && ri < (puzzle.length -1)) && (ci > 0 && ci < (row.length - 1))) {

          const {
            isLeftRightVisible,
            leftViewCount,
            rightViewCount
          } = lookLeftRight(coordinates, cell);
          const {
            isVisibleUpDown,
            upViewCount,
            downViewCount
          } = lookUpDown(coordinates, cell);

          const score = (leftViewCount * rightViewCount * upViewCount * downViewCount);
          if (isLeftRightVisible || isVisibleUpDown) {
            visibleTrees += 1;
          }

          if (score > highestSenicScore) {
            highestSenicScore = score;
          }
        }
    });
  });

  console.log('The puzzle', puzzle);
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 8 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
        <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
        <br />
      </Body>
      <Body>
        Visible trees: {visibleTrees}
        <br />
        Highest Scenic Score: {highestSenicScore}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day8;
