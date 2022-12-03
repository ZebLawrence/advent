import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { orderBy } from 'lodash';
import puzzleInput from '../../puzzles/day15-2021-simple';
import puzzleInputReal from '../../puzzles/day15-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 15 2021',
      realTest: false,
      avoid: 9
    };
    this.toggleTest = this.toggleTest.bind(this);
    this.setAvoid = this.setAvoid.bind(this);
  }

  toggleTest() {
    const { realTest } = this.state;
    this.setState({ realTest: !realTest });
  }

  setAvoid(event) {
    const { value } = event.currentTarget;
    this.setState({ avoid: value || 9 });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, realTest, avoid } = this.state;
    const { risks } = realTest ? puzzleInputReal : puzzleInput;
    const riskMap = [];
    const visitedPositions = {};
    const lowPositions = {};
    
    risks.forEach((row, ri) => {
      riskMap.push([]);
      row.split('').forEach(risk => {
        riskMap[ri].push(Number(risk));
      });
    });

    let endReached = false;

    const getBasinSiblingsForThisCell = (rowIndex, colIndex, basinMap) => {
      const cell = riskMap[rowIndex] && riskMap[rowIndex][colIndex] || avoid;

      if (rowIndex === riskMap.length - 1 && colIndex === riskMap[rowIndex].length - 1) {
        endReached = true;
      }

      if (cell < avoid && !basinMap[`${rowIndex}-${colIndex}`]) {
        basinMap[`${rowIndex}-${colIndex}`] = cell;

        getBasinSiblingsForThisCell(rowIndex - 1, colIndex, basinMap); // up
        getBasinSiblingsForThisCell(rowIndex + 1, colIndex, basinMap); // down
        getBasinSiblingsForThisCell(rowIndex, colIndex - 1, basinMap); // left
        getBasinSiblingsForThisCell(rowIndex, colIndex + 1, basinMap); // right
      }
    };

    getBasinSiblingsForThisCell(0, 0, visitedPositions);

    console.log('The Risks', riskMap);
    console.log('The visited positions', visitedPositions);
    console.log('Was the end reached', endReached);



    function coordinatesToIndex({ x, y }, map) {
      return x + y * map.length;
    }
    
    function indexToCoordinates(index, map) {
      const x = index % map.length;
      const y = (index - x) / map.length;
      return {
        x,
        y,
      };
    }
    
    function getNeighbors(index, map) {
      const { x, y } = indexToCoordinates(index, map);
      const list = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },
      ].filter(({ x, y }) => x >= 0 && y >= 0 && x < map.length && y < map.length);
      return list;
    }
    


    function solve(map) {
      const target = { x: map.length - 1, y: map.length - 1 };
      const targetIndex = coordinatesToIndex(target, map);
      const results = {};
      const dist = Array(map.length * map.length).fill(Infinity);
      const Q = new Set(
        Array(map.length * map.length)
          .fill(0)
          .map((x, index) => index)
      );
    
      console.log('Starting Q set', Q);

      dist[0] = 0;
    
      let previousMin = 0;
      let lastCoords = '';

      while (Q.size > 0) {
        let min = Infinity;
        let minIndex = 0;
    
        for (const value of Q) {
          if (dist[value] < min) {
            min = dist[value];
            minIndex = value;

          }
        }
        
        if (min > previousMin) {
          previousMin = min;
          results[lastCoords] = min;
        }
        const { x, y } = indexToCoordinates(minIndex, map);
        lastCoords = `${x}-${y}`;

        console.log('Current min', min)
        
        const u = minIndex;
        // console.log('The current u', u)
        Q.delete(u);
    
        if (u === targetIndex) break;
    
        const neighbors = getNeighbors(u, map);
    
        for (const neighbor of neighbors) {
          const neighborIndex = coordinatesToIndex(neighbor, map);
          const alt = dist[u] + map[neighbor.y][neighbor.x];
    
          if (alt < dist[neighborIndex]) {
            dist[neighborIndex] = alt;

            console.log('Setting a new neighbor index cost', alt);
          }
        }
      }

      console.log(dist[coordinatesToIndex(target, map)]);
      return results;
    }
    
    const biggerMap = Array(5 * riskMap.length)
      .fill(0)
      .map((_, y) =>
        Array(5 * riskMap.length)
          .fill(0)
          .map((_, x) => {
            const originalX = x % riskMap.length;
            const originalY = y % riskMap.length;
            const offset = Math.floor(x / riskMap.length) + Math.floor(y / riskMap.length);
            const value = riskMap[originalY][originalX] + offset;
            return value > 9 ? value - 9 : value;
          })
      );
    
    // console.log(biggerMap.map((v) => v.join("")).join`\n`);
    let smallPath = solve(riskMap);
    // let largePath = solve(biggerMap);

    console.log('The results', smallPath);
    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
        <Button onClick={this.toggleTest}>Toggle test</Button>
        <input type="number" defaultValue={avoid} className="ml-3" onChange={this.setAvoid} />
          <div>
            Can end be reached: {endReached ? 'True' : 'False'}
          </div>
          <div>
            <table className="chiton-table">
              <tbody>
                {
                  riskMap.map((row, ri) => {
                    return (
                      <tr key={`row-${ri}`}>
                        {
                          row.map((cell, ci) => {
                            let cellClass = 'alert-success';

                            if (cell >= avoid) {
                              cellClass = 'alert-danger';
                            }

                            if (visitedPositions[`${ri}-${ci}`]) {
                              cellClass = 'alert-primary';
                            }

                            if (smallPath[`${ri}-${ci}`]) {
                              cellClass = 'alert-warning';
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
