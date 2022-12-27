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

  const [moves, setMoves] = useState(parseTextByLines(sample.moves).map(m => parseMove(m)));
  const [stacks1, setStacks1] = useState(sample.stacks);
  const [stacks2, setStacks2] = useState(sample.stacks2);
  const timeStart = Date.now();

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

  const handleStart = () => {
    moves.forEach(move => {
      performMoves(stacks1, ...move);
    });
    setStacks1({...stacks1});

    moves.forEach(move => {
      performMoves(stacks2, ...move, true);
    });
    setStacks2({...stacks2});
  };

  const topCrates1 = Object.keys(stacks1).map(key => {
    const stack = stacks1[key];
    return stack[stack.length - 1];
  });
  const topCrates2 = Object.keys(stacks2).map(key => {
    const stack = stacks2[key];
    return stack[stack.length - 1];
  });

  const pivotObject = table => {
    const rows = [];
    const stacks = Object.keys(table).map(key => table[key]);
    const tallestStack = Math.max(...stacks.map(o => o.length))

    for (let ri = (tallestStack - 1); ri >= 0; ri -= 1) {
      const row = [];

      stacks.forEach((col, ci) => {
        const cell = stacks[ci] && stacks[ci][ri]
          ? stacks[ci][ri]
          : '';
          row.push(cell);
      });
      rows.push(row);
    }
    return rows;
  };

  const rows1 = pivotObject(stacks1);
  const rows2 = pivotObject(stacks2);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 5 2022" day={5} year={2022}/>
      <Body>
        <Button size="sm" onClick={() => {
          setMoves(parseTextByLines(sample.moves).map(m => parseMove(m)));
          setStacks1({...sample.stacks});
          setStacks2({...sample.stacks2});
        }}>Sample</Button>
        <Button size="sm" onClick={() => {
          setMoves(parseTextByLines(puzzle1.moves).map(m => parseMove(m)));
          setStacks1({...puzzle1.stacks})
          setStacks2({...puzzle1.stacks2})
        }}>Full Puzzle</Button>
        <Button size="sm" onClick={handleStart}>Start Moves</Button>
      </Body>
      <Body>
        <div className="d-flex justify-content-around">
          <div>
            Crates on top part 1: {topCrates1}
            <table className="containers">
              <tbody>
                {
                  rows1.map((row, ri) => {
                    const rowKey = `row-stack1-${ri}`;
                    return (
                      <tr key={rowKey}>
                        {
                          row.map((cell, ci) => {
                            const cellKey = `cell-stack1-${ri}-${ci}`;
                            let cellClass = cell !== '' ? `color-${Math.floor(Math.random() * 5)}` : '';
                            return (
                              <td className={cellClass} key={cellKey}>{cell}</td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  {
                    Object.keys(stacks1).map((row, hi) => {
                      const thKey = `row-stack1-th-${hi}`;
                      return (<th key={thKey} className="text-center">{(hi + 1)}</th>);
                    })
                  }
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            Crates on top part 2: {topCrates2}
            <table className="containers">
              <tbody>
                {
                  rows2.map((row, ri) => {
                    const rowKey = `row-stack2-${ri}`;
                    return (
                      <tr key={rowKey}>
                        {
                          row.map((cell, ci) => {
                            const cellKey = `cell-stack2-${ri}-${ci}`;
                            let cellClass = cell !== '' ? `color-${Math.floor(Math.random() * 5)}` : '';
                            return (<td className={cellClass} key={cellKey}>{cell}</td>);
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  {
                    Object.keys(stacks1).map((row, hi) => {
                      const thKey = `row-stack2-th-${hi}`;
                      return (<th key={thKey} className="text-center">{(hi + 1)}</th>);
                    })
                  }
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day5;
