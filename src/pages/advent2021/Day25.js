import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample,
  puzzle1
} from '../../puzzles/day25';

function Day25() {

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample));
  const [seaCucumbers, setSeaCucumbers] = useState(puzzle.map(row => row.split('')));
  const [step, setStep] = useState(0);
  const timeStart = Date.now();

  const processNextStep = () => {
    console.log('Processing step');
    let madeHorzMoves = false;
    let madeVertMoves = false;
    seaCucumbers.forEach((seaCucumberRow, ri) => {
      const newRowSpots = [];
      seaCucumberRow.forEach((spot, ci) => {
        if (spot === '>') {
          // check for avail spot to right
          const nextColIndex = seaCucumberRow[ci + 1]
            ? ci + 1
            : 0;     

          if (seaCucumberRow[nextColIndex] === '.') {
            // from index to index
            newRowSpots.push([ci, nextColIndex]);
          }
        }
      });

      // update horizontal cucumbers
      if (newRowSpots.length) {
        madeHorzMoves = true;
        newRowSpots.forEach(([oldIndex, newIndex]) => {
          seaCucumberRow[oldIndex] = '.';
          seaCucumberRow[newIndex] = '>';
        });
      }
    });

    const newColSpots = [];
    seaCucumbers.forEach((seaCucumberRow, ri) => {
      seaCucumberRow.forEach((spot, ci) => {
        if (spot === 'v') {
          // check for avail spot to right
          const nextRowIndex = seaCucumbers[ri + 1] && seaCucumbers[ri + 1][ci] !== null
            ? ri + 1
            : 0;
          if (seaCucumbers[nextRowIndex][ci] === '.') {
            // from index to index
            newColSpots.push([ri, ci, nextRowIndex]);
          }

        }
      });
      
    });

    // update horizontal cucumbers
    if (newColSpots.length) {
      madeVertMoves = true;
      newColSpots.forEach(([oldRow, oldCol, newRow]) => {
        seaCucumbers[oldRow][oldCol] = '.';
        seaCucumbers[newRow][oldCol] = 'v';
      });
    }

    if (madeHorzMoves || madeVertMoves) {
      setSeaCucumbers(seaCucumbers);
      setStep(step + 1);
    }
  };

  console.log('The seaCucumbers', seaCucumbers);
  const timeEnd = Date.now();

  const getIcon = (char) => {
    switch (char) {
      case '.':
        return '🪸';
      case '>':
        return '➡️';
      case 'v':
        return '⬇️';
      default:
        break;
    }
  };

  return (
    <div className="advent-day">
      <Title message="Day 25 2021" />
      <Body>
        <Button size="sm" onClick={() => {
          setPuzzle(parseTextByLines(sample));
          setSeaCucumbers(puzzle.map(row => row.split('')));
        }}>Sample</Button>
        <Button size="sm" onClick={() => {
          setPuzzle(parseTextByLines(puzzle1));
          setSeaCucumbers(puzzle.map(row => row.split('')));
        }}>Full Puzzle</Button>
        <Button size="sm" onClick={processNextStep}>Next Step</Button>
        <br />
        Step: {step}
      </Body>
      <Body>
        <table>
          <tbody>
            {
              seaCucumbers.map((row, ri) => {
                const rowKey = `row-${ri}`;
                return (
                  <tr key={rowKey}>
                    {
                      row.map((cell, ci) => {
                        const cellkey = `cell-${ri}-${ci}`;
                        return (
                          <td className={`cucumber-cell ${cell === '.' ? 'good-result' : 'bad-result'}`} key={cellkey}>{getIcon(cell)}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );

}

export default Day25;
