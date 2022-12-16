import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1,
} from '../../puzzles/2022/day15';

function Day15() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    const coordinates = input.split('\n').map((sensorBeacon, index) => {
      let [sensorRaw, beaconRaw] = sensorBeacon.split(':');
      const sensor = sensorRaw.replace('Sensor at x=', '').replace(' y=', '').split(',').map(n => Number(n));
      const beacon = beaconRaw.replace(' closest beacon is at x=', '').replace(' y=', '').split(',').map(n => Number(n));
      const distance = Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);

      return {
        sensor,
        beacon,
        distance
      };
    });

    return {
      coordinates
    }
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));

  const mergeRanges = (ranges) => {
    const [first, ...rest] = ranges.sort((a, b) => a[0] - b[0]);
    const merged = [first];
  
    for (const [nextFrom, nextTo] of rest) {
      const [prevFrom, prevTo] = merged.at(-1);
  
      if (nextFrom <= prevTo + 1) {
        merged[merged.length - 1] = [prevFrom, Math.max(prevTo, nextTo)];
      } else {
        merged.push([nextFrom, nextTo]);
      }
    }
    
    return merged;
  }


  const getRowRanges = (rowIndex, minX = -Infinity, maxX = Infinity) => {
    const { coordinates } = puzzle;
    const ranges = [];

    for (let index = 0; index < coordinates.length; index += 1) {
      const { sensor: [sensorX, sensorY], distance } = coordinates[index];
      const distanceToRow = Math.abs(rowIndex - sensorY);
      const offsetX = distance - distanceToRow;
      const width = (offsetX * 2) + 2;
      const leftX = sensorX - offsetX;
      const rightX = sensorX + offsetX;

      if (width > 0 && rightX >= minX && leftX <= maxX) {
        ranges.push([Math.max(minX, leftX), Math.min(maxX, rightX)]);
      }
    }

    return mergeRanges(ranges).filter(X => X);
  };

  const getCountByRow = rowIndex => {
    const rowRanges = getRowRanges(rowIndex);

    const beaconsOnRow = new Set(
      puzzle.coordinates.filter(({beacon: [x, y]}) => y === rowIndex).map(({beacon: [x, y]}) => { return x })
    ).size;

    return (
      rowRanges.length && rowRanges
      .map(([from, to]) => Math.abs(to - from) + 1)
      .reduce((a, b) => a + b, 0) - beaconsOnRow
    );
  };

  const getTuningFreq = () => {
    const max = 4000000;

    for (let y = 0; y <= max; y++) {
      const ranges = getRowRanges(y, 0, max)
      if (ranges.length === 2) {
        return (ranges[0][1] + 1) * 4000000 + y
      }
    }
  };

  const row10Count = getCountByRow(10);
  const row2000000Count = getCountByRow(2000000);
  const tuningFreq = getTuningFreq();

  // console.log('The row10Count', row10Count);
  // console.log('The tuningFreq', tuningFreq);
  // console.log('The puzzle', puzzle);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={15} year={2022}/>
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
        Row 10 number of positions with no beacon: {row10Count}
        <br />
        Row 2000000 number of positions with no beacons:  {row2000000Count || 0}
        <br />
        The Tuning Freq of missing beacon {tuningFreq}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day15;
