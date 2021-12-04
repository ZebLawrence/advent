import React, { Component } from 'react';
import puzzleInput from '../../puzzles/day3-2021';
// import puzzleInput from '../../puzzles/day3-2021-Simple';
import Title from './Title';
import TimeTaken from './TimeTaken';
import Body from './Body';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 3 2021'
    };
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage } = this.state;
    const { reports } = puzzleInput;
    const bits = [];
    const oneBits = [];
    const zeroBits = [];
    let oxygenBits = [];
    let co2Bits = [];


    for (let index = 0; index < reports.length; index++) {
      const reportBits = reports[index];
      
      for (let bindex = 0; bindex < reportBits.length; bindex++) {
        const reportBit = Number(reportBits[bindex]);
        
        if (index === 0) {
          bits.push(reportBit);
        } else {

          if (reportBit) {
            bits[bindex] += 1;
          } else {
            bits[bindex] -= 1;
          }
        }

        if (bindex === 0) {
          if (reportBit) {
            oneBits.push(reportBits);
          } else {
            zeroBits.push(reportBits);
          }
        }
      }
    }

    const gammaRate = [];
    const epsilonRate = [];
    bits.forEach(bit => {
      gammaRate.push(bit > 0 ? 1 : 0);
      epsilonRate.push(bit < 0 ? 1 : 0);
    });

    const gammaDecimal = parseInt(gammaRate.join(''), 2)
    const epsilonDecimal = parseInt(epsilonRate.join(''), 2)

    oxygenBits = bits[0] > 0 ? oneBits : zeroBits;
    co2Bits = bits[0] > 0 ? zeroBits : oneBits;
    let examineIndex = 1;

    while (oxygenBits.length > 1) {
      const oneBitsTemp = [];
      const zeroBitsTemp = [];

      for (let index = 0; index < oxygenBits.length; index++) {
        const oxygenBit = Number(oxygenBits[index][examineIndex]);
        
        if (oxygenBit) {
          oneBitsTemp.push(oxygenBits[index]);
        } else {
          zeroBitsTemp.push(oxygenBits[index]);
        }
      }

      oxygenBits = oneBitsTemp.length >= zeroBitsTemp.length ? oneBitsTemp : zeroBitsTemp;
      examineIndex +=1;
    }

    examineIndex = 1;
    while (co2Bits.length > 1) {
      const oneBitsTemp = [];
      const zeroBitsTemp = [];

      for (let index = 0; index < co2Bits.length; index++) {
        const oxygenBit = Number(co2Bits[index][examineIndex]);
        
        if (oxygenBit) {
          oneBitsTemp.push(co2Bits[index]);
        } else {
          zeroBitsTemp.push(co2Bits[index]);
        }
      }

      co2Bits = oneBitsTemp.length >= zeroBitsTemp.length ? zeroBitsTemp : oneBitsTemp;
      examineIndex +=1;
    }

    const oxygenRating = parseInt(oxygenBits[0], 2);
    const co2Rating = parseInt(co2Bits[0], 2);

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <div>Gamma rate: {gammaRate.join('')} as decimal {gammaDecimal}</div>
          <div>Epsilon rate: {epsilonRate.join('')} as decimal {epsilonDecimal}</div>
          <div>Power consumtion: {gammaDecimal * epsilonDecimal}</div>
          <hr />
          <div>Oxygen gen rating: {oxygenRating}</div>
          <div>CO2 gen rating: {co2Rating}</div>
          <div>Life support rating: {oxygenRating * co2Rating}</div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
