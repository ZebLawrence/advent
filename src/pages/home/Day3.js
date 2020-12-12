import React, { Component } from 'react';
import { Button } from 'reactstrap';
import day3 from '../../puzzles/day3';
//import day3 from '../../puzzles/day3Simple';
import './home.scss';

class Day3 extends Component {
  constructor(props){
    super(props);
    this.state = {
      slope: 1,
      fall: 1,
      defaultMessage: 'This is the message from class Home construction'
    };

    this.toggleBadResults = this.toggleBadResults.bind(this);
    this.updateSlope = this.updateSlope.bind(this);
    this.updateFall = this.updateFall.bind(this);
  }

  toggleBadResults() {
    const { hideBadResults } = this.state;
    this.setState({
      hideBadResults: !hideBadResults
    });
  }

  updateSlope(input) {
    const { value } = input.target;
    this.setState({
      slope: Number(value)
    });
  }

  updateFall(input) {
    const { value } = input.target;
    this.setState({
      fall: Number(value)
    });
  }

  render() {
    const { slope, fall } = this.state;
    const { data } = day3 || {};
    const terrainLevels = [];
    const trees = [];
    const open = [];
    const timeStart = Date.now();
    let distanceIndex = 0;
    console.log('The new fall', fall);

    String.prototype.replaceAt = function(index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    for (const index in data) {
      const area = data[index];
      const multipler = Math.floor(distanceIndex / area.length);
      let forestSection = area;

      if ((index % fall) == 0) {

        for (let index = 0; index < multipler; index++) {
          forestSection += area;       
        }
  
        const charAt = forestSection.charAt(distanceIndex);
  
        if(charAt === '.') {
          open.push(charAt)
          forestSection = forestSection.replaceAt(distanceIndex, '0');
        } else {
          trees.push(charAt)
          forestSection = forestSection.replaceAt(distanceIndex, 'X');
        }
  
  
        terrainLevels.push(
          <div className="forest-section">
            <span>{forestSection.slice(0, distanceIndex)}</span>
            <span className="person">{forestSection.slice(distanceIndex, distanceIndex + 1)}</span>
            <span>{forestSection.slice(distanceIndex + 1, forestSection.length)}</span>
          </div>
        );
  
        distanceIndex += slope;
      }

    }

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <div>Day 2</div>
        <div>
          <label>
            Slope
            <input type="number" defaultValue={slope} onChange={this.updateSlope} />
          </label>
          <label>
            fall
            <input type="number" defaultValue={fall} onChange={this.updateFall} />
          </label>
        </div>
        <div>Trees Hit</div>
        <div>{trees.length}</div>
        <div>Forest</div>
        <pre className="forest">{terrainLevels}</pre>
        <div>{timeEnd - timeStart}</div>
      </div>
    );
  }
}

export default Day3;
