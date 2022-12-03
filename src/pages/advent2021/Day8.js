import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day8-2021';
// import puzzleInputReal from '../../puzzles/day8-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import Digit from './Digit';


class Day1 extends Component {
  constructor(props){
    super(props);
    const { patterns } = puzzleInput;

    this.numberMap = {
      zero: 'abcefg',
      one: 'cf',
      two: 'acdeg',
      three: 'acdfg',
      four: 'bcdf',
      five: 'abdfg',
      six: 'abdefg',
      seven: 'acf',
      eight: 'abcdefg',
      nine: 'abcdfg'
    };

    this.valueMap = {
      'abcefg': '0',
      'cf': '1',
      'acdeg': '2',
      'acdfg': '3',
      'bcdf': '4',
      'abdfg': '5',
      'abdefg': '6',
      'acf': '7',
      'abcdefg': '8',
      'abcdfg': '9'
    };

    this.defaultSegments = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g'
    };

    this.outputTotal = 0;

    const mappedSignals = patterns.map((signal, sIndex) => {
      const [a, b] = signal.split(' | ');
      const inputsTemp = a.split(' ');
      const outputsTemp = b.split(' ');
      const inputs = inputsTemp.map(input => {
        return (input.split('').sort().join(''));
      });
      const outputs = outputsTemp.map(output => {
        return (output.split('').sort().join(''));
      });

      let mappedSegments = this.mapUniqueSymbols(inputs, 0, 1, 0, 1);
      let validMapping = this.validateMapping(mappedSegments, inputs);

      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 1, 0, 0, 1);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 1, 0, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 0, 1, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      // more
      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 0, 1, 0, 1, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 1, 0, 0, 1, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }
  
      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 0, 1, 1, 0, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      if (!validMapping) {
        mappedSegments = this.mapUniqueSymbols(inputs, 1, 0, 1, 0, 1, 0);
        validMapping = this.validateMapping(mappedSegments, inputs);
      }

      let outputNumber = '';

      outputs.forEach(output => {
        let result = '';
        for (let index = 0; index < output.length; index++) {
          const letter = output[index];
          result += mappedSegments[letter];
        }
        const foundNumber = this.valueMap[result.split('').sort().join('')];
        outputNumber = `${outputNumber}${foundNumber}`;
      });

      this.outputTotal += Number(outputNumber);

      return ({
        inputs,
        outputs,
        mappedSegments,
        total: Number(outputNumber)
      });
    });

    this.state = {
      defaultMessage: 'Day 8 2021',
      realTest: false,
      signalIndex: 0,
      mappedSignals
    };

    this.nextSignal = this.nextSignal.bind(this);
    this.translateSignal = this.translateSignal.bind(this);
    this.mapUniqueSymbols = this.mapUniqueSymbols.bind(this);
    this.validateMapping = this.validateMapping.bind(this);
  }

  validateMapping(map, inputs) {
    const translated = inputs.map(input => {
      let result = '';
      for (let index = 0; index < input.length; index++) {
        const letter = input[index];
        result += map[letter];
      }
      return result.split('').sort().join('');
    });
    
    let isValid = true;

    Object.keys(this.numberMap).forEach(key => {
      const toTest = this.numberMap[key];
      if (isValid && translated.indexOf(toTest) === -1) {
        isValid = false;
      }
    });

    return isValid;
  }

  mapUniqueSymbols(inputs, b, d, e, g, c = 0, f = 1) {
      const { one, four, seven, eight } = this.numberMap;
      const newMap = {};
      const uniquesNumbers = {};

      inputs.forEach(input => {
        switch (input.length) {
          case one.length:
            uniquesNumbers.one = input;
            break; 
          case four.length:
            uniquesNumbers.four = input;
            break;
          case seven.length:
            uniquesNumbers.seven = input;
            break;
          case eight.length:
            uniquesNumbers.eight = input;
            break;  
          default:
            break;
        }
      });

      // mapping from 1
      newMap.c = uniquesNumbers.one[c];
      newMap.f = uniquesNumbers.one[f];

      // mapping seven
      uniquesNumbers.seven = uniquesNumbers.seven.replace(newMap.c, '');
      uniquesNumbers.seven = uniquesNumbers.seven.replace(newMap.f, '');
      newMap.a = uniquesNumbers.seven[0];

      // mapping 4
      uniquesNumbers.four = uniquesNumbers.four.replace(newMap.a, '');
      uniquesNumbers.four = uniquesNumbers.four.replace(newMap.c, '');
      uniquesNumbers.four = uniquesNumbers.four.replace(newMap.f, '');
      newMap.b = uniquesNumbers.four[b];
      newMap.d = uniquesNumbers.four[d];

      // mapping eight
      uniquesNumbers.eight = uniquesNumbers.eight.replace(newMap.a, '');
      uniquesNumbers.eight = uniquesNumbers.eight.replace(newMap.b, '');
      uniquesNumbers.eight = uniquesNumbers.eight.replace(newMap.c, '');
      uniquesNumbers.eight = uniquesNumbers.eight.replace(newMap.d, '');
      uniquesNumbers.eight = uniquesNumbers.eight.replace(newMap.f, '');
      newMap.e = uniquesNumbers.eight[e];
      newMap.g = uniquesNumbers.eight[g];

      const finalMap = {};

      Object.keys(newMap).forEach(key => {
        const newKey = newMap[key];
        finalMap[newKey] = key;
      });

      return finalMap;
  }


  nextSignal() {
    const { signalIndex, mappedSignals } = this.state;
    let newIndex = mappedSignals.length === signalIndex + 1 ? 0 : signalIndex + 1;

    this.setState({ signalIndex: newIndex });
  }

  translateSignal(baseSignal) {
    const { mappedSignals, signalIndex } = this.state;
    const { mappedSegments } = mappedSignals[signalIndex];
    let result = '';

    for (let index = 0; index < baseSignal.length; index++) {
      const letter = baseSignal[index];
      result += mappedSegments[letter];
    }

    return result;
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, signalIndex, mappedSignals } = this.state;
    let count = 0;

    for (let index = 0; index < mappedSignals.length; index++) {
      const { outputs } = mappedSignals[index];
      const { one, four, seven, eight } = this.numberMap;
      const lengths = [one.length, four.length, seven.length, eight.length];
      outputs.forEach(output => {
        count += lengths.indexOf(output.length) > -1 ? 1 : 0;
      });
    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <div>
            Number of unique signals: {count}
          </div>
          <div>Output Totals {this.outputTotal}</div>
          <Button className="ml-3" onClick={this.nextSignal}>Next Signal</Button>
          {/* <div className="d-inline-flex flex-wrap">
            <Digit signal={this.numberMap.one} />
            <Digit signal={this.numberMap.four} />
            <Digit signal={this.numberMap.seven} />
            <Digit signal={this.numberMap.eight} />
          </div> */}
          <div className="pt-5">
            {
              Object.keys(this.defaultSegments).map(key => {
                const { mappedSegments } = mappedSignals[signalIndex];
                return (
                  <label key={`label-${key}`}>
                    {key}:
                    <input className="segment-input ml-1 mr-3" name={key} value={mappedSegments[key]} />
                  </label>
                );
              })
            }
          </div>
          <div>Input Signal at index: {signalIndex}</div> 
          <div className="d-inline-flex flex-wrap">
            {
              mappedSignals[signalIndex].inputs.map(signal => {
                return (<Digit key={`input-digit-${signal}`} signal={this.translateSignal(signal)}/>);
              })
            }
          </div>
          <div>Output</div>
          <div className="d-inline-flex flex-wrap">
            {
              mappedSignals[signalIndex].outputs.map(signal => {
                return (<Digit key={`output-digit-${signal}`} signal={this.translateSignal(signal)}/>);
              })
            }
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
