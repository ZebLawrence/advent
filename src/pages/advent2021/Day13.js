import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day13-2021-simple';
import puzzleInputReal from '../../puzzles/day13-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 13 2021',
      realTest: true,
      allFolds: false,
      foldStep: 12
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.nextFoldStep = this.nextFoldStep.bind(this);
    this.allFolds = this.allFolds.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest, foldStep: 0 });
  }

  nextFoldStep() {
    const { foldStep } = this.state;
    this.setState({ foldStep: foldStep + 1 });
  }

  allFolds() {
    this.setState({ allFolds: true });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest, foldStep, allFolds } = this.state;
    const { folds, points } = realTest ? puzzleInputReal : puzzleInput;
    let maxHorz = 0;
    let maxVert = 0;
    const paperMap = {};
    const rows = [];

    points.forEach(([horz, vert]) => {
      maxHorz = horz > maxHorz ? horz : maxHorz;
      maxVert = vert > maxVert ? vert : maxVert;
      paperMap[`${vert}-${horz}`] = {horz, vert};
    });

    let dotCount = 0;

    for (let rowIndex = 0; rowIndex <= maxVert; rowIndex++) {
      rows.push([]);
      
      for (let colIndex = 0; colIndex <= maxHorz; colIndex++) {
        if (paperMap[`${rowIndex}-${colIndex}`]) {
          rows[rowIndex].push('⨀');
          dotCount += 1;
        } else {
          rows[rowIndex].push('•');
        }
      }
    }
  
    let foldedRows = [...rows];
    // fold rows and cols
    const foldVertically = (atIndex, oldRows) => {
      let topHalf = oldRows.slice(0, atIndex);
      let bottomHalf = oldRows.slice(atIndex + 1);
      bottomHalf = bottomHalf.reverse();
      const newRows = [];

      topHalf.forEach((row, ri) => {
        newRows.push([]);
        row.forEach((cell, ci) => {
          const bottomCell = bottomHalf[ri][ci];
          newRows[ri].push(bottomCell === '⨀' ? bottomCell : cell);
        });
      });

      return newRows;
    }

    const foldHorizontally = (atIndex, oldRows) => {
      const result = [];
      oldRows.forEach((row, ri) => {
        let leftSide = row.slice(0, atIndex);
        let rightSide = row.slice(atIndex + 1);
        rightSide = rightSide.reverse();
        result.push([]);

        leftSide.forEach((cell, ci) => {
          const rightCell = rightSide[ci];
          result[ri].push(rightCell === '⨀' ? rightCell : cell);
        });
      });

      return result;
    }

    const loopCount = allFolds ? folds.length : foldStep;
    for (let foldIndex = 0; foldIndex < loopCount; foldIndex++) {
      const { verticalIndex, horizontalIndex } = folds[foldIndex];
      if (verticalIndex) {
        foldedRows = foldVertically(verticalIndex, foldedRows);
      }

      if (horizontalIndex) {
        foldedRows = foldHorizontally(horizontalIndex, foldedRows);
      }
    }
    
    const dotsStringLength = JSON.stringify(foldedRows).split('⨀').length - 1;

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <Button className="ml-3" onClick={this.nextFoldStep}>Next fold</Button>
          <Button className="ml-3" onClick={this.allFolds}>All folds</Button>
          <div>
            At fold: {foldStep}
          </div>
          <div>
            Dot Count: {dotsStringLength}
          </div>
          <div>
            <table className="folding-table">
              <tbody>
                {
                  foldedRows.map((row, ri) => {
                    return (
                      <tr key={`row-${ri}`}>
                        {
                          row.map((cell, ci) => {
                            let cellClass = 'alert-danger';

                            if (cell === '⨀') {
                              cellClass = 'alert-success';
                            }

                            return (<td className={cellClass} key={`cell-${ri}-${ci}`}>{cell}</td>)

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
