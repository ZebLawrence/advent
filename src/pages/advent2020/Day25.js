import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.nextLoop = this.nextLoop.bind(this);
    this.runLoops = this.runLoops.bind(this);
    this.loops = this.loops.bind(this);

    // const cardPubKey = 5764801;
    // const doorPubKey = 17807724;
    // let cardTestKey = null;
    // let doorTestKey = null;
    // let cardLoops = 1;
    // let doorLoops = 1;

    // // while (cardTestKey !== cardPubKey || doorTestKey !== doorTestKey) {
    //   console.log('trying loop', cardLoops);
    //   cardTestKey = this.loops(cardLoops, 1);
    //   doorTestKey = this.loops(doorLoops, 1);

    //   const newCardLoops = cardTestKey === cardPubKey ? 0 : 1;
    //   const newDoorLoops = doorTestKey === doorPubKey ? 0 : 1;
    //   cardLoops = newCardLoops;
    //   doorLoops = newDoorLoops;
    // }

    // console.log('The card loops found', cardLoops);
    // console.log('The door loops found', doorLoops);

    let cardLoops = 3974372;
    let doorLoops = 8623737;

    this.state = {
      defaultMessage: 'Day 25 2020',
      // cardPubKey: 5764801, // sample
      cardPubKey: 18356117,
      cardTestKey: 18356117,
      // doorPubKey: 17807724, // sample
      doorPubKey: 5909654,
      doorTestKey: 5909654,
      cardLoops: 3974372,
      doorLoops: 8623737
    };

  }

  processStep(value, subjectNumber) {
    return (value * subjectNumber) % 20201227;
  }

  loops(numSteps, value, subjectNumber = 7) {
    for (let index = 0; index < numSteps; index++) {
      value = this.processStep(value, subjectNumber);
    }
    return value
  }

  runLoops() {
    const { cardLoops, doorLoops } = this.state;

    let cardTestKey = this.loops(cardLoops, 1);
    let doorTestKey = this.loops(doorLoops, 1);
  
    this.setState({ cardTestKey, doorTestKey });
  }

  nextLoop() {
    const { cardLoops, doorLoops, cardTestKey, doorTestKey, cardPubKey, doorPubKey } = this.state;
    const newCardLoops = cardTestKey === cardPubKey ? 0 : 1;
    const newDoorLoops = doorTestKey === doorPubKey ? 0 : 1;
    this.setState({
      cardLoops: cardLoops + newCardLoops,
      doorLoops: doorLoops + newDoorLoops 
    }, this.runLoops);
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, cardLoops, doorLoops, cardPubKey, cardTestKey, doorPubKey, doorTestKey } = this.state;

    // const processStep = (value, subjectNumber) => {
    //   return (value * subjectNumber) % 20201227;
    // };

    // const runLoops = (numSteps, value) => {
    //   for (let index = 0; index < numSteps; index++) {
    //     value = processStep(value, 7);
    //   }
    //   return value
    // };

    // let cardPubKey = runLoops(8, 1);
    // let doorPubKey = runLoops(11, 1);
 
    // console.log('Finished result', cardPubKey);
    const bothLoopsFound = cardPubKey === cardTestKey && doorPubKey === doorTestKey;

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button disabled={bothLoopsFound} onClick={this.nextLoop} color="primary">{bothLoopsFound ? 'Found Loops' : 'Next loop'}</Button>
          <table>
            <caption>Test cases</caption>
            <thead><th></th><th></th><th>loops</th></thead>
            <tbody>
              <tr><td>Card pub key:</td><td>{cardTestKey}</td><td>{cardLoops}</td></tr>
              <tr><td>Expecting:</td><td>{cardPubKey}</td><td></td></tr>
              <tr><td>Door pub key:</td><td>{doorTestKey}</td><td>{doorLoops}</td></tr>
              <tr><td>Expecting:</td><td>{doorPubKey}</td><td></td></tr>
            </tbody>
          </table>
          <div>
            Card using door encryption key: {this.loops(cardLoops, 1, doorTestKey)}
          </div>
          <div>
            Door using card encryption key: {this.loops(doorLoops, 1, cardTestKey)}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
