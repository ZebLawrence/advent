import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day7-2021-simple';
import puzzleInputReal from '../../puzzles/day7-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import '../../assets/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 7 2021',
      realTest: false
    };
    this.toggleTest = this.toggleTest.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest } = this.state;
    const { startingPositions } = realTest ? puzzleInputReal : puzzleInput;
    const positionCosts = [];
    const maxPosition = Math.max(...startingPositions);

    const getFuelCost = dist => {
      let cost = 0;
      for (let index = 1; index <= dist; index++) {
        cost += index;
      }
      return cost;
    };

    for (let index = 1; index <= maxPosition; index++) {
      const positionValue = index;
      let positionTotalCost = 0;

      startingPositions.forEach(position => {
        positionTotalCost += getFuelCost(Math.abs(position - positionValue));
      });

      positionCosts.push(positionTotalCost);
    }

    const leastFuel = Math.min(...positionCosts);
    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <div>
            Least fuel cost: {leastFuel}, from position: {positionCosts.indexOf(leastFuel) + 1}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
