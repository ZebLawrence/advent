import React, { Component } from 'react';
// import puzzleInput from '../../puzzles/day6-2021-simple';
import puzzleInput from '../../puzzles/day6-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 6 2021',
      days: 80
    };
    this.updateDays = this.updateDays.bind(this);
    this.childrenCount = 0;
  }

  updateDays(e) {
    const { value } = e.currentTarget;
    this.childrenCount = 0;
    this.setState({days: value})
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, days } = this.state;
    const { fishAges } = puzzleInput;

    let fishStagesMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    };

    // set up starting point
    fishAges.forEach(age => {
      fishStagesMap[age] += 1;
    });

    for (let index = 0; index < days; index++) {
      const {
        0: zero,
        1: one,
        2: two,
        3: three,
        4: four,
        5: five,
        6: six,
        7: seven,
        8: eight
      } = fishStagesMap;
      
      const newFish = {
        0: one,
        1: two,
        2: three,
        3: four,
        4: five,
        5: six,
        6: zero + seven,
        7: eight,
        8: zero
      };

      fishStagesMap = newFish;
    }

    // count fish
    Object.keys(fishStagesMap).forEach(key => {
      this.childrenCount += fishStagesMap[key];
    });

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <label>
            Days: 
            <input defaultValue={days} onBlur={this.updateDays} />
          </label>
          <div>Total fish: {this.childrenCount}</div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
