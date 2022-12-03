import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day10-2021-simple';
import puzzleRealInput from '../../puzzles/day10-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.pointsTable = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    };
    this.autoCompleteScoretable = {
      '(': 1,
      '[': 2,
      '{': 3,
      '<': 4
    };
    this.openPairMap = {
      ')': '(',
      ']': '[',
      '}': '{',
      '>': '<'
    };
    this.closePairMap = {
      '(': ')',
      '[': ']',
      '{': '}',
      '<': '>'
    };

    this.state = {
      defaultMessage: 'Day 10 2021',
      realTest: false,
      isSecondTest: false
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.toggleTestSecondTest = this.toggleTestSecondTest.bind(this);
    this.calculateAutoScore = this.calculateAutoScore.bind(this);
  }

  toggleTestSecondTest() {
    const { isSecondTest } = this.state;
    this.setState({ isSecondTest: !isSecondTest });
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  calculateAutoScore(openTagsRemaining) {
    let score = 0;
    openTagsRemaining = openTagsRemaining.reverse();

    openTagsRemaining.forEach(char => {
      score = (score * 5) + this.autoCompleteScoretable[char];
    });

    return score;
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest, isSecondTest } = this.state;
    const { lines } = realTest ? puzzleRealInput : puzzleInput;
    let opens = [];
    const openTest = /\(|\[|{|</;
    const closeTest = /\)|\]|}|>/;
    const illegalChars = [];
    const corruptLines = [];
    let syntaxErrorScore = 0;
    let autoCompleteScores = [];

    lines.forEach((line, lineIndex) => {
      const chars = line.split('');
      opens = [];

      for (let index = 0; index < chars.length; index++) {
        const char = `${chars[index]}`;

        if (openTest.test(char)) {
          opens.push(char);
        }
  
        if (closeTest.test(char)) {
          const lastOpen = opens.at(-1);
          if (lastOpen === this.openPairMap[char]) {
            opens.pop();
          } else {
            corruptLines.push(lineIndex);
            syntaxErrorScore += this.pointsTable[char];
            illegalChars.push(char);
            break;  
          }
        }
      }

      if (corruptLines.indexOf(lineIndex) === -1) {
        autoCompleteScores.push(this.calculateAutoScore(opens));
      }

    });

    autoCompleteScores = autoCompleteScores.sort((a, b) => a - b);
    const middleAutoCompleteScore = autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];
    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <div>
            Illegal chars: {JSON.stringify(illegalChars)}
          </div>
          <div>
            Syntax error score: {syntaxErrorScore}
          </div>
          <div>
            Auto complete score: {middleAutoCompleteScore}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
