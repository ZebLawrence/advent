import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day11';

class Monkey {
  constructor(monkeyAttributes) {   
    const attributes = monkeyAttributes.split('\n').filter(x => x).map(attr => attr.split(':'));

    this.items = attributes[1][1]?.trim().split(',').map(n => Number(n)) || [];
    const [old, symbol, oldOrNumber] = attributes[2][1].split('=')[1].trim().split(' ');
    this.symbol = symbol;
    this.oldOrNumber = oldOrNumber;
    this.monkeyTestDivisor = Number(attributes[3][1].split('by')[1].trim());
    this.trueMonkey = Number(attributes[4][1].split('monkey')[1].trim());
    this.falseMonkey = Number(attributes[5][1].split('monkey')[1].trim());

    this.siblings = [];
    this.itemsInspected = 0;
  }

  setSiblingMonkeys(siblings) {
    this.siblings = siblings;
    this.divider = siblings.map((m) => m.monkeyTestDivisor).reduce((a, b) => a * b, 1);
  }

  catchItem(item) {
    this.items.push(item);
  }

  throwItem(item, monkeyIndex) {
    this.siblings[monkeyIndex].catchItem(item);
    this.items.shift()
  }

  caculateWorry(startingWorry) {
    let newWorry = 0;
    const old = startingWorry;
    const oldOrNumber = this.oldOrNumber === 'old' ? Number(startingWorry) : Number(this.oldOrNumber);

    if (this.symbol === '+') {
      newWorry = old + oldOrNumber;
    } 
    else if (this.symbol === '*') {
      newWorry = old * oldOrNumber;
    }

    return newWorry
  } 

  takeTurn(isPart2) {
    // for each item
    const tempItems = [...this.items];
    tempItems.forEach(startingWorry => {
      let newWorry = this.caculateWorry(startingWorry);
      if (isPart2) {
        newWorry = newWorry % this.divider;
      } else {
        newWorry = Math.floor(newWorry / 3);
      }
      
      if (newWorry % this.monkeyTestDivisor) {
        this.throwItem(newWorry, this.falseMonkey);
      } else {
        this.throwItem(newWorry, this.trueMonkey);
      }
      
      this.itemsInspected += 1;
    });
  }
}

function Day11() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    return input.split('#');
  };
  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const monkeysPlaying1 = [];
  const monkeysPlaying2 = [];
  
  puzzle.forEach(mA => {
    monkeysPlaying1.push(new Monkey(mA));
    monkeysPlaying2.push(new Monkey(mA));
  });
  
  monkeysPlaying1.forEach((mP, index) => {
    mP.setSiblingMonkeys(monkeysPlaying1);
  });
  monkeysPlaying2.forEach(mP => {
    mP.setSiblingMonkeys(monkeysPlaying2);
  });

  for (let index = 0; index < 20; index += 1) {
    monkeysPlaying1.forEach((monkey, index) => {
      monkey.takeTurn();
    });
  }

  for (let index = 0; index < 10000; index += 1) {
    monkeysPlaying2.forEach((monkey, index) => {
      monkey.takeTurn(true);
    });
  }

  const [mostActive1, secondMost1] = monkeysPlaying1.map(mF => mF.itemsInspected).sort((a, b) => b - a);
  const [mostActive2, secondMost2] = monkeysPlaying2.map(mF => mF.itemsInspected).sort((a, b) => b - a);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 11 2022" />
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            {/* <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample2))}>Sample 2</Button> */}
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
          </FormGroup>
        </Form>
        <br />
        info
      </Body>
      <Body>
        Part 1. The level of monkey business after 20 turns {mostActive1 * secondMost1}
        <br />
        Part 2. The level of monkey business after 10000 turns {mostActive2 * secondMost2}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day11;
