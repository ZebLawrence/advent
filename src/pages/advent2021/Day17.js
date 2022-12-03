import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import puzzleInput from '../../puzzles/day17-2021-simple';
import puzzleInputReal from '../../puzzles/day17-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import Chart from './Chart';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 17 2021',
      realTest: false,
      part: false,
      currentXVelocity: 7,
      currentYVelocity: 2
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  setInput(event) {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: Number(value) });
  }

  nextStep() {
    const { part } = this.state;
    this.setState({ part: !part });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest, part, currentXVelocity, currentYVelocity } = this.state;
    const { target } = realTest ? puzzleInputReal : puzzleInput;
    const { x, y } = target;
    const [x1, x2] = x;
    const [y1, y2] = y;

    const targetCoords = [
      { target: {x: x1, y: y1 } },
      { target: {x: x2, y: y1 } },
      { target: {x: x2, y: y2 } },
      { target: {x: x1, y: y2 } },
      { target: {x: x1, y: y1 } }
    ];

    const maxXVelocity = x2;
    const minXVelocity = realTest ? 22 : 0;
    const minYVelocity = y1;
    const maxYVelocity = realTest ? 74 : 150;

    const checkTargetForHit = (x, y) => {
      return x >= x1 && y <= y2 || y <= y1
    };

    const isInsideTarget = (x, y) => {
      return x >= x1 && y <= y2 && x <= x2 && y >= y1;
    };

    const calculateStep = (x, y, xVel, yVel) => {
      const addX = xVel - 1;
      const addY = yVel - 1;
      return ({
        x: addX <= 0 ? x : x + addX,
        y: y + addY,
        xVel: addX <= 0 ? 0 : addX,
        yVel: addY
      });
    };

    let currentXposition = 0;
    let currentYposition = 0;
    let shotCoordinates;

    const testCoordinates = (testXVel, testYVel) => {
      shotCoordinates = [{ shot: { y: currentYposition, x: currentXposition }}];
      let targetReached = false;
      let xVelocity = testXVel;
      let yVelocity = testYVel;
      let testSteps = 0;
  
      while (!targetReached) {
        if (testSteps === 0) {
          currentXposition = testXVel;
          currentYposition = testYVel;
        } else {
          const { x, y, xVel, yVel } = calculateStep(currentXposition, currentYposition, xVelocity, yVelocity);
          xVelocity = xVel;
          yVelocity = yVel;
          currentXposition = x;
          currentYposition = y;
        }
        shotCoordinates.push({ shot: { y: currentYposition, x: currentXposition }});
        targetReached = checkTargetForHit(currentXposition, currentYposition);
        testSteps += 1;
      }

      return { x: currentXposition, y: currentYposition };
    };


    const workingVelocities = [];

    if (part) {
      for (let xIndex = minXVelocity; xIndex <= maxXVelocity; xIndex++) {
        for (let yIndex = minYVelocity; yIndex <= maxYVelocity; yIndex++) {
          const { x, y } = testCoordinates(xIndex, yIndex);
          if (isInsideTarget(x, y)) {
            workingVelocities.push(`${xIndex},${yIndex}`);
          }
        }
      }
    } else {
      // part 1
      testCoordinates(currentXVelocity, currentYVelocity);
    }


    // map DPs and target for chart
    const dataPoints = shotCoordinates.map((dp, index) => {
      if (targetCoords[index]) {
        return {...dp, ...targetCoords[index]};
      } else {
        return dp;
      }
    });

    if (dataPoints.length < targetCoords.length) {
      const startI = dataPoints.length - 1;
      for (let index = startI; index < targetCoords.length; index++) {
        dataPoints.push({shot: {
          y: currentYposition + currentYposition, x: currentXposition + currentXposition
        }, ...targetCoords[index]});
      }
    }

    const maxHeight = Math.max(...shotCoordinates.map(s => s.shot.y));
    const hit = isInsideTarget(currentXposition, currentYposition);
    const hitClass = hit ? 'alert-success' : 'alert-danger';

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <Button className="ml-3" onClick={this.nextStep}>Part 1/2</Button>
          <div className={hitClass}>
            Height reached: {maxHeight}, {hit ? 'Hit' : 'Miss'}
          </div>
          <div>
            Found working combinations: {workingVelocities.length}
          </div>
          <div className="mt-3">
            <label>
              X Velocity:
              <input className="ml-1" type="number" name="currentXVelocity" onChange={this.setInput} defaultValue={currentXVelocity} />
            </label>
            <label className="ml-3">
              Y Velocity:
              <input className="ml-1" type="number" name="currentYVelocity" onChange={this.setInput} defaultValue={currentYVelocity} />
            </label>
          </div>

          <Chart dataPoints={dataPoints} title="Trick Shot" />
          <Row>
            <Col xs={4}>

              <Chart dataPoints={dataPoints} title="Trick Shot" />
            </Col>
            <Col xs={4}>
              <Chart dataPoints={[
                {shot:{y:0, x:0}, target: { y:-5, x:20}},
                {shot:{y:2, x:7}, target: { y:-5, x:30}},
                {shot:{y:3, x:13}, target: { y:-10, x:30}},
                {shot:{y:3, x:18}, target: { y:-10, x:20}},
                {shot:{y:2, x:22}, target: { y:-5, x:20}},
                {shot:{y:0, x:25}, target: { y:-5, x:20}},
                {shot:{y:-3, x:27}, target: { y:-5, x:20}},
                {shot:{y:-7, x:28}, target: { y:-5, x:20}}
              ]} title="Trick Shot" />
            </Col>
            <Col xs={4}>

            </Col>
          </Row>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
