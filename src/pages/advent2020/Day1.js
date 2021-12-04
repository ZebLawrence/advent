import React, { Component } from 'react';
import { Button } from 'reactstrap';
import day1 from '../../puzzles/day1';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideBadResults: true,
      findNumber: 3,
      goalValue: 2020,
      defaultMessage: 'This is the message from class Home construction'
    };

    console.log('The day 1 data', day1.data);
    this.toggleBadResults = this.toggleBadResults.bind(this);
    this.setNumberToFind = this.setNumberToFind.bind(this);
  }

  toggleBadResults() {
    const { hideBadResults } = this.state;
    this.setState({
      hideBadResults: !hideBadResults
    });
  }

  setNumberToFind(input) {
    const findNumber = input.target.value;
    console.log('The input', findNumber);
    this.setState({
      findNumber
    });
  }

  render() {
    const { goalValue, hideBadResults, findNumber } = this.state;
    const { data } = day1 || {};
    const badAnswers = [];
    const goodAnswers = [];
    const timeStart = Date.now();

    for (let index = 0; index < data.length; index++) {
      const amount = data[index];
      const diff1 = goalValue - amount;
      const matchingIndex1 = data.indexOf(diff1);

      if (matchingIndex1 > -1) {
        const partner = data[matchingIndex1];
        goodAnswers.push(
          <div className="good-result">
            <span>{partner}</span>
            <span>plus</span>
            <span>{amount}</span>
            <span>equals</span>
            <span>{partner + amount}</span>
            <span><input value={partner * amount}/></span>
          </div>
        );
        break;
      } else {
        badAnswers.push(
          <div className={`bad-result ${hideBadResults ? 'hide' : ''}`}>
            <span>{amount}</span>
            <span>No Match</span>
          </div>
        );
      }
    }

  loop1:
    for (let index = 0; index < data.length; index++) {
      const amount = data[index];
      const diff1 = goalValue - amount;

      for (let index2 = 0; index2 < data.length; index2++) {
        const amount2 = data[index2];
        const diff2 = diff1 - amount2;
        const matchingIndex2 = data.indexOf(diff2);

        if (matchingIndex2 > -1) {
          const partner = data[matchingIndex2];
          goodAnswers.push(
            <div className="good-result">
              <span>{partner}</span>
              <span>plus</span>
              <span>{amount}</span>
              <span>plus</span>
              <span>{amount2}</span>
              <span>equals</span>
              <span>{partner + amount + amount2}</span>
              <span><input value={partner * amount * amount2}/></span>
            </div>
          );
          break loop1;
        } else {
          badAnswers.push(
            <div className={`bad-result ${hideBadResults ? 'hide' : ''}`}>
              <span>{amount}</span>
              <span>{amount2}</span>
              <span>No Match</span>
            </div>
          );
        }
      }
    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <div>Day 1</div>
        <div>
          <input onChange={this.setNumberToFind} defaultValue={findNumber}/>
          <Button onClick={this.toggleBadResults}>Toggle Bad Results</Button>
        </div>
        <div>
          {goodAnswers}
          {badAnswers}
        </div>
        <div>Time taken</div>
        <div>{timeEnd - timeStart}</div>
      </div>
    );
  }
}

export default Day1;
