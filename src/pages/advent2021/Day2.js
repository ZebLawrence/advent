import React, { Component } from 'react';
import puzzleInput from '../../puzzles/day2-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 2 2021'
    };

  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage } = this.state;
    const { commands } = puzzleInput;
    let depth = 0;
    let dist = 0;
    let aim = 0 ;

    for (let index = 0; index < commands.length; index++) {
      const [direction, amount] = commands[index].split(' ');
      
      switch (direction) {
        case 'up':
          aim -= Number(amount);
          break;
        case 'down':
          aim += Number(amount);
          break;
        case 'forward':
          dist += Number(amount);
          depth += (amount * aim);
          break;
      }
    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <div>
            Depth: {depth}
          </div>
          <div>
            Distance: {dist}
          </div>
          <div>
            Aim: {aim}
          </div>
          <div>
            Total: { depth * dist }
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
