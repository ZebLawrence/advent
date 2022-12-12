import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { countBy } from 'lodash';
import puzzleInput from '../../puzzles/day14-2021-simple';
import puzzleInputReal from '../../puzzles/day14-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import Chart from './Chart';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 14 2021',
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
    const { template, polymers } = realTest ? puzzleInputReal : puzzleInput;

    let polymerRules = new Map();
    polymers.forEach(polymer => {
      const [pair, insert] = polymer.split(' -> ');
      polymerRules.set(pair, insert);
    });
  

    const step = (steps, graphData) => {

      let map = new Map();
      for (let i = 0; i < template.length - 1; i++) {
        let pair = `${template[i]}${template[i + 1]}`;
        map.set(pair, (map.get(pair) || 0) + 1);
      }
  
      let letterCount = countBy(template);

      for (let i = 1; i <= steps; i++) {
        let new_map = new Map();
        for (let [pair, pairCount] of map) {
          const insertLetter = polymerRules.get(pair);
          const [left, right] = pair;
          const leftPair = `${left}${insertLetter}`;
          const rightPair = `${insertLetter}${right}`;
          // insert new pairs to map
          // add previous count to new count 
          new_map.set(leftPair,  (pairCount + (new_map.get(leftPair) || 0)));
          new_map.set(rightPair, (pairCount + (new_map.get(rightPair) || 0)));
          letterCount[insertLetter] = ((letterCount[insertLetter] || 0) + pairCount);
        }
        graphData.push({ step: i, letters: {...letterCount}});
        map = new_map;
      }

      return (Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount)));
    }

    const letterGraph10Steps = [];
    const letterGraph40Steps = [];

    const currentPuzzleAt10Steps = step(10, letterGraph10Steps);
    const currentPuzzleAt40Steps = step(40, letterGraph40Steps);


    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} day={14} year={2021}/>
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <Button className="ml-3" onClick={this.nextStep}>Next step</Button>
          <div>
            Starting polymer: {template}
          </div>
          <div>
            At 10 steps: {currentPuzzleAt10Steps}
          </div>
          <div>
            At 40 steps: {currentPuzzleAt40Steps}
          </div>
          <Chart useLog dataPoints={letterGraph10Steps.map(l => l.letters)} xAxis={letterGraph10Steps.map(l => l.step)} title="Letter counts at 10 steps" />
          <Chart useLog dataPoints={letterGraph40Steps.map(l => l.letters)} xAxis={letterGraph40Steps.map(l => l.step)} title="Letter counts at 40 steps (LOG)" />
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
