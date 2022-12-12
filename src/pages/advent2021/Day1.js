import React, { Component } from 'react';
import puzzleInput from '../../puzzles/day1-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 1 2021'
    };
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage } = this.state;
    const { depths } = puzzleInput;
    let previousHeight = 0;
    let total = 0;

    for (let index = 2; index < depths.length; index++) {
      const depth1 = depths[index - 1];
      const depth2 = depths[index];
      const depth3 = depths[index + 1];

      if (depth3 && depth1 && depth2) {
        const sum = depth1 + depth2 + depth3;
        total += sum > previousHeight ? 1 : 0;
        previousHeight = sum
      }

    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage}  day={1} year={2021} />
        <Body>
          <div>
            Increases: {total}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
