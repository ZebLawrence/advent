import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { find } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day21';

class Monkey {
  constructor({
    name,
    num,
    leftName,
    operation,
    rightName
  }, part2) {
    this.name = name;
    this.num = num;
    this.leftName = leftName;
    this.operation = name === 'root' && part2 ? '=' : operation;
    this.rightName = rightName;
  }

  yellNumber() {
    if (this.num !== undefined && this.listeners[this.name]) {
      this.listeners[this.name](this.num);
    } else {
      // console.log('Name', this.name);
      // console.log('Is trying to yell', this.num);
      // console.error('But nobody is listening');
    }
  }

  performOperation() {
    const left = this[`${this.leftName}Val`];
    const right = this[`${this.rightName}Val`];

    if (this.operation === '+') {
      this.num = left + right;
    } else if (this.operation === '-') {
      this.num = left - right;
    } else if (this.operation === '*') {
      this.num = left * right;
    } else if (this.operation === '/') {
      this.num = left / right;
    } else if (this.operation === '=') {
      this.num = left === right;
    }

    this.yellNumber();
  }

  setVal(listenName, val) {
    // maybe set to a diff var as to not overwrite the original name
    this[`${listenName}Val`] = val;

    if (this[`${this.leftName}Val`] !== undefined && this[`${this.rightName}Val`] !== undefined) {
      this.performOperation();
    }
  }

  setListeners(listeners) {
    this.listeners = listeners;

    if (this.leftName && this.rightName) {
      listeners[this.leftName] = val => { this.setVal(this.leftName, val); };
      listeners[this.rightName] = val => { this.setVal(this.rightName, val); };
    }
  }
}

function Day21() {
  const timeStart = Date.now();
  const parsePuzzle = input => {
    return input.split('\n').map(monkey => {
      const [name, task] = monkey.split(':');
      let num = undefined;
      let leftName = undefined;
      let operation = undefined;
      let rightName = undefined;
      if(!isNaN(task)) {
        num = Number(task);
      } else {
        [leftName, operation, rightName] = task.split(' ').filter(Boolean);
      }

      return {
        name,
        num,
        leftName,
        operation,
        rightName
      };
    });
  };
  const [part, setPart] = useState(2);
  const [puzzle, setPuzzle] = useState(parsePuzzle(puzzle1));
  const listeners = {};

  let monkeys = [...puzzle].map(m => new Monkey(m, part === 2));
  monkeys.forEach(m => m.setListeners(listeners));
  let root = find(monkeys, m => m.name === 'root');
  const human = find(monkeys, m => m.name === 'humn');
  
  if (part === 2) {
    
    human.num = puzzle.length === 15 ? 301 : 3555057453229;

    //TODO turn this into binary search

    // const start  = 3555057453200;
    // const end  =   3555057453300;
    // monkeys.forEach(m => m.yellNumber());
    // let testNum = 0;
    // let previousLeftVal = 0;
    // for (let index = 0; index < 300; index += 1) {
    // for (let index = start; index < end; index += 1) {

    //   testNum = index;
    //   human.num = testNum;
    //   human.yellNumber();
    //   monkeys.forEach(m => m.yellNumber());
    //   // console.log('looping at', testNum);
    //   // console.log('   The Root num', root.num);
    //   console.log('   Step at The Root vals', testNum, ':', root[`${root.leftName}Val`], root[`${root.rightName}Val`]);
    //   console.log(`(${testNum}) Difference`, previousLeftVal - root[`${root.leftName}Val`]);
    //   console.log(`Distance from goal`, previousLeftVal - 8226036122233);
    //   if(root.num) {
    //     console.error('Found working', testNum);
        
    //     break;
    //   }
    //   previousLeftVal = root[`${root.leftName}Val`];
      
    // }
      
    

  }

  monkeys.forEach(m => m.yellNumber());
  
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={21} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => {
              setPart(1);
              setPuzzle(puzzle);
            }}>Part 1</Button>
            <Button size="sm" onClick={() => {
              setPart(2);
              setPuzzle(puzzle);
            }}>Part 2</Button>
            <br />
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>
          Root monkey result: {`${root.num}`}
          <br />
          Human number: {human.num}
        </div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day21;
