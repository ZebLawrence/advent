import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day11-2021';
import puzzleInputReal from '../../puzzles/day11-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import Otcopus from './Otcopus';


  const { octopusGrid } = puzzleInput;
  const octopusMap = octopusGrid.map(row => {
    return row.split('').map(num => Number(num));
  });

  octopusMap.forEach((row, rowIndex) => {
    row.forEach((octopus, colIndex) => {
      octopusMap[rowIndex][colIndex] = new Otcopus(octopus, `Row:${rowIndex}-Col:${colIndex}`);    
    });
  });

  // set adjacent octopi
  octopusMap.forEach((row, rowIndex) => {
    row.forEach((octopus, colIndex) => {
      const upLeft = octopusMap[rowIndex - 1] && octopusMap[rowIndex - 1][colIndex - 1] && octopusMap[rowIndex - 1][colIndex - 1] || null;
      const up = octopusMap[rowIndex - 1] && octopusMap[rowIndex - 1][colIndex] || null;
      const upRight = octopusMap[rowIndex - 1] && octopusMap[rowIndex - 1][colIndex + 1] && octopusMap[rowIndex - 1][colIndex + 1] || null;
      const left = octopusMap[rowIndex][colIndex - 1] && octopusMap[rowIndex][colIndex - 1] || null;
      const right = octopusMap[rowIndex][colIndex + 1] && octopusMap[rowIndex][colIndex + 1] || null;
      const downLeft = octopusMap[rowIndex + 1] && octopusMap[rowIndex + 1][colIndex - 1] && octopusMap[rowIndex + 1][colIndex - 1] || null;
      const down = octopusMap[rowIndex + 1] && octopusMap[rowIndex + 1][colIndex] || null;
      const downRight = octopusMap[rowIndex + 1] && octopusMap[rowIndex + 1][colIndex + 1] && octopusMap[rowIndex + 1][colIndex + 1] || null;
      
      const listeners = [upLeft, up, upRight, left, right, downLeft, down, downRight].filter(list => list);
      octopusMap[rowIndex][colIndex].addFlashListeners(listeners);
      // console.log(`listeners for row ${rowIndex}, col ${colIndex}:`, listeners);

    });
  }); 

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 11 2021',
      realTest: false,
      // steps: 194,
      hasOtopusInited: false
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.setSteps = this.setSteps.bind(this);
    this.nextStep = this.nextStep.bind(this);

 

  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  setSteps(event) {
    const { value } = event.currentTarget;
    this.setState({ steps: value });
  }

  nextStep() {
    const { steps } = this.state;
    this.setState({ steps: steps + 1 });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, } = this.state;


    let stepFlashes = 0;
    let steps = 1000;
    let go = true;
    let stepsToAll = 0;

    while (go) {

      for (let index = 0; index < steps; index++) {  
        stepFlashes = 0;  
        octopusMap.forEach((row, ri1) => {
          row.forEach(octopus => {
            octopus.startStep();
          });
        });

        octopusMap.forEach(row => {
          row.forEach(octopus => {
            octopus.checkFlash();
          });
        });

        octopusMap.forEach(row => {
          row.forEach(octopus => {
            octopus.endStep();
          });
        });

        octopusMap.forEach(row => {
          row.forEach(octopus => {

            const endEnergy = octopus.getEnergy();

            if (endEnergy === 0) {
              stepFlashes += 1;
            }

          });
        });

        if (stepFlashes === 100) {
          go = false;
          stepsToAll = index + 1;
          break;
        }
      }
    }



    console.log('The octo map after', octopusMap);

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <label className="mr-3">
            <input defaultValue={steps} onBlur={this.setSteps} />
          </label>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <Button className="ml-3" onClick={this.nextStep}>Next step</Button>
          <div>
            <div>
              Steps to all: {stepsToAll}, Step flashes {stepFlashes}
            </div>

            <table className="octopus-table">
              <tbody>
                {
                  octopusMap.map((row, ri) => {
                    return (
                      <tr key={`row-${ri}`}>
                        {
                          row.map((octopus, ci) => {
                            const octopusEnergy = octopus.getEnergy();
                            let cellClass = 'alert-primary';

                            if (octopusEnergy === 0) {
                              cellClass = 'alert-success';
                            }

                            return (<td className={cellClass} key={`cell-${ri}-${ci}`}>{octopusEnergy}</td>)
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
