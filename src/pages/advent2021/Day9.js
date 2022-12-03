import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day9-2021-simple';
import puzzleInputReal from '../../puzzles/day9-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import '../../assets/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 9 2021',
      realTest: false
    };
    this.toggleTest = this.toggleTest.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest } = this.state;
    const { heights } = realTest ? puzzleInputReal : puzzleInput;
    const columns = [];
    const heightmap = heights.map((row, ri) => {
      const cols = row.split('');

      cols.forEach((col, ci) => {
        if (ri === 0) {
          columns.push([col]);
        } else {
          columns[ci].push(col);
        }
      });

      return cols;
    });
 
    const getBasinSiblingsForThisCell = (rowIndex, colIndex, basinMap) => {
      const cell = heightmap[rowIndex] && heightmap[rowIndex][colIndex] || 9;
      if (cell < 9 && !basinMap[`${rowIndex}-${colIndex}`]) {
        basinMap[`${rowIndex}-${colIndex}`] = cell;

        getBasinSiblingsForThisCell(rowIndex - 1, colIndex, basinMap); // up
        getBasinSiblingsForThisCell(rowIndex + 1, colIndex, basinMap); // down
        getBasinSiblingsForThisCell(rowIndex, colIndex - 1, basinMap); // left
        getBasinSiblingsForThisCell(rowIndex, colIndex + 1, basinMap); // right
      }
    };

    const lowPoints = [];
    let riskLevel = 0;
    const basins = [];
    const lowPointCoordinates = {};

    for (let rowIndex = 0; rowIndex < heightmap.length; rowIndex++) {
      const row = heightmap[rowIndex];
      
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const point = row[colIndex];
        const max = Number.MAX_SAFE_INTEGER;
        const up = heightmap[rowIndex - 1] && heightmap[rowIndex - 1][colIndex] || max;
        const down = heightmap[rowIndex + 1] && heightmap[rowIndex + 1][colIndex] || max;
        const left = heightmap[rowIndex][colIndex - 1] || max;
        const right = heightmap[rowIndex][colIndex + 1] || max;

        if (Math.min(up, down, left, right) > Number(point)) {
          lowPoints.push(Number(point));
          riskLevel += (Number(point) + 1);

          lowPointCoordinates[`${rowIndex}-${colIndex}`] = point;
          const basinMap = {};
          getBasinSiblingsForThisCell(rowIndex, colIndex, basinMap);

          basins.push({ size: Object.keys(basinMap).length , basinMap });
        }
      }
    }

    const [a, b, c] = basins.map(basin => basin.size).sort((a, b) => b - a);
    const basinScore = a * b * c;

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
        <Button onClick={this.toggleTest}>Toggle test</Button>
          <div>
            The low points {JSON.stringify(lowPoints)}
          </div>
          <div>
            The risk level: {riskLevel}
          </div>
          <div>
            The basin sizes: {basinScore}
          </div>
          <div>
            <table className="basin-table">
              <tbody>
                {
                  heightmap.map((row, ri) => {
                    return (
                      <tr key={`row-${ri}`}>
                        {
                          row.map((cell, ci) => {
                            let cellClass = 'alert-danger';

                            if (Number(cell) < 9) {
                              cellClass = 'alert-success';
                            }

                            if (lowPointCoordinates[`${ri}-${ci}`]) {
                              cellClass = 'alert-primary';
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
