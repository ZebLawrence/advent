import React, { Component } from 'react';
import { Button } from 'reactstrap';
import day2 from '../../puzzles/day2';
import './home.scss';

class Day2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideBadResults: true,
      findNumber: 3,
      goalValue: 2020,
      defaultMessage: 'This is the message from class Home construction'
    };

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
    const { data } = day2 || {};
    const badAnswers = [];
    const goodAnswers = [];
    const bestAnswers = [];
    const timeStart = Date.now();

    //console.log(data);

    for (const index in data) {
      
        const ruleAndPassword = data[index].split(':');
        const rule = ruleAndPassword[0];
        const password = ruleAndPassword[1];
        const ruleValues = rule.split(' ');
        const counts = ruleValues[0].split('-');
        const letter = ruleValues[1];
        const reg = new RegExp(letter, 'g');
        const minCount = Number(counts[0]);
        const maxCount = Number(counts[1]);
        const matchCount = (password.match(reg) || []).length;

      if (matchCount >=  minCount && matchCount <= maxCount) {
        // goodAnswers.push(
        //     <div className={`good-result ${hideBadResults ? '' : 'hide'}`}>
        //       <span>{password}</span>
        //       <span>matches</span>
        //       <span>{rule}</span>
        //     </div>        
        // );
      } else {
        badAnswers.push(
          <div className={`bad-result ${hideBadResults ? 'hide' : ''}`}>
            <span>{password}</span>
            <span>No Match</span>
            <span>{rule}</span>
          </div>
        );
      }

      const charAt1 = password.charAt(minCount - 1);
      const charAt2 = password.charAt(maxCount - 1);

      if (charAt1 === letter && charAt2 !== letter || charAt1 !== letter && charAt2 === letter) {
        bestAnswers.push(
          <div className={`good-result ${hideBadResults ? '' : 'hide'}`}>
            <span>{password}</span>
            <span>matches</span>
            <span>{rule}</span>
          </div>        
      );
      } else {
        badAnswers.push(
          <div className={`bad-result ${hideBadResults ? 'hide' : ''}`}>
            <span>{password}</span>
            <span>No Match</span>
            <span>{rule}</span>
          </div>
        );      
      }
    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <div>Day 2</div>
        <div>
          <Button onClick={this.toggleBadResults}>Toggle Bad Results</Button>
        </div>
        <div>
          {bestAnswers}
          {goodAnswers}
          {badAnswers}
        </div>
        <div>Best Passwords</div>
        <div>{bestAnswers.length}</div>
        <div>Valid Passwords</div>
        <div>{goodAnswers.length}</div>
        <div>Failed Passwords</div>
        <div>{badAnswers.length}</div>
        <div>Time taken</div>
        <div>{timeEnd - timeStart}</div>
      </div>
    );
  }
}

export default Day2;
