import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day19-2021-simple';
import puzzleInputReal from '../../puzzles/day14-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import Chart3d from './Chart3d';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 19 2021',
      realTest: false
      // steps: 40
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  nextStep() {
    const { steps } = this.state;
    this.setState({ steps: steps + 1 });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest, steps } = this.state;
    const { scanners } = realTest ? puzzleInputReal : puzzleInput;

    const mappedScanners = {};

    function normalizeAtIndex(list, atIndex) {
      const result = [];
      const { x: baseX, y: baseY, z: baseZ } = {...list[atIndex]};

      list.forEach(coords => {
        const { x, y, z } = coords;
        result.push({ x: x - baseX, y: y - baseY, z: z - baseZ });
      });

      return result;
    }

    function getMatches(listOne, listTwo) {
      const results = [];
      listOne.forEach(itemOne => {
        listTwo.forEach(itemTwo => {
          if (JSON.stringify(itemOne) === JSON.stringify(itemTwo)) {
            results.push(itemOne);
          }
        });
      });
      return results;
    }

    function addRollCoords(direction, { x: xRaw, y: yRaw, z: zRaw }) {
      const regular = { x: xRaw, y: yRaw, z: zRaw };
      if (!direction['zero']) {
        direction['zero'] = [regular];
      } else {
        direction['zero'].push(regular);
      }

      const right = { x: yRaw, y: -xRaw, z: zRaw };
      if (!direction['ninety']) {
        direction['ninety'] = [right];
      } else {
        direction['ninety'].push(right);
      }

      const down = { x: -yRaw, y: -xRaw, z: zRaw };
      if (!direction['oneeighty']) {
        direction['oneeighty'] = [down];
      } else {
        direction['oneeighty'].push(down);
      }

      const left = { x: -yRaw, y: xRaw, z: zRaw };
      if (!direction['twoseventy']) {
        direction['twoseventy'] = [left];
      } else {
        direction['twoseventy'].push(left);
      }
    }

    scanners.forEach((scanner, sIndex) => {
      const scannerName = `scanner-${sIndex}`;
      mappedScanners[scannerName] = {
        rawCoords: [],
        rotations: {
          forward: {},
          up: {},
          down: {},
          left: {},
          right: {},
          behind: {}
        }
      };

      scanner.forEach((coords, cIndex) => {
        const [ xRaw, yRaw, zRaw ] = coords.split(',').map(n => Number(n));
        mappedScanners[scannerName].rawCoords.push({ x: xRaw, y: yRaw, z: zRaw });

        addRollCoords(mappedScanners[scannerName].rotations.forward, { x: xRaw, y: yRaw, z: zRaw });
        // up
        // const up = { x: xRaw, y: zRaw, z: -yRaw };
        addRollCoords(mappedScanners[scannerName].rotations.up, { x: xRaw, y: zRaw, z: -yRaw });
        // down
        // const down = { x: xRaw, y: -zRaw, z: yRaw };
        addRollCoords(mappedScanners[scannerName].rotations.down, { x: xRaw, y: -zRaw, z: yRaw });
        // left
        // const left = { x: zRaw, y: yRaw, z: -xRaw };
        addRollCoords(mappedScanners[scannerName].rotations.left, { x: zRaw, y: yRaw, z: -xRaw });
        // right
        // const right = { x: -zRaw, y: yRaw, z: xRaw};
        addRollCoords(mappedScanners[scannerName].rotations.right, { x: -zRaw, y: yRaw, z: xRaw});
        // behind
        // const behind = { x: -xRaw, y: yRaw, z: -zRaw };
        addRollCoords(mappedScanners[scannerName].rotations.behind, { x: -xRaw, y: yRaw, z: -zRaw });
      });
    });

    console.log('Mapped', mappedScanners);

    Object.keys(mappedScanners).forEach((key) => {
      const { rawCoords } = mappedScanners[key];
      const normalizedScanners = normalizeAtIndex(rawCoords, 0);
      const matches = {};

      for (let testKey in mappedScanners) {
        // console.log('wanting to compare key', key);
        // console.log('with', testKey);
        if (key !== testKey) {
          const { rotations } = mappedScanners[testKey];

          //for (let tIndex = 0; tIndex < testCoords.length; tIndex++) {

            for (let rotationKey in rotations) {
              for(let directionKey in rotations[rotationKey]) {
                const compareCoords = rotations[rotationKey][directionKey];

                console.log(`${testKey}|${rotationKey}|${directionKey}`);
                for (let tIndex = 0; tIndex < compareCoords.length; tIndex++) {

                  const compareNormalized = normalizeAtIndex(compareCoords, tIndex);
                  const testMatches = getMatches(compareNormalized, normalizedScanners);
                  if (testMatches > 1) {
                    matches[`${testKey}|${rotationKey}|${directionKey}|${tIndex}`] = testMatches;
                  }
                }

              }
            }
          //}
        }
      }
      mappedScanners[key].matches = matches;
    });


    console.log('After matches', mappedScanners);

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <Button className="ml-3" onClick={this.nextStep}>Next step</Button>
          <div>
            Here
          </div>
          {/* <Chart3d data={scanners} /> */}
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
