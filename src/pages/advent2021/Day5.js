import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInputReal from '../../puzzles/day5-2021';
import puzzleInput from '../../puzzles/day5-2021-simple';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';


class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 5 2021',
      ventLine: null,
      useRealPuzzle: false
    };
    this.nextVentLine = this.nextVentLine.bind(this);
    this.togglePuzzle = this.togglePuzzle.bind(this);
  }

  nextVentLine() {
    let { ventLine } = this.state;
    if (ventLine === null) {
      ventLine = 0;
      this.setState({ventLine});
    } else {
      this.setState({ventLine: ventLine += 1});
    }
  }

  togglePuzzle() {
    const { useRealPuzzle } = this.state;
    this.setState({ useRealPuzzle: !useRealPuzzle });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, ventLine, useRealPuzzle } = this.state;
    const { coordinates } = useRealPuzzle ? puzzleInputReal : puzzleInput;
    let maxHorz = 0;
    let maxVert = 0;
    let rows = [];

    const mappedPairs = coordinates.map(pair => {
      const [point1, point2] = pair.split(' -> ');
      let [horz1, vert1] = point1.split(',');
      let [horz2, vert2] = point2.split(',');

      horz1 = Number(horz1);
      vert1 = Number(vert1);
      horz2 = Number(horz2);
      vert2 = Number(vert2);

      maxHorz = horz1 > maxHorz ? horz1 : maxHorz;
      maxHorz = horz2 > maxHorz ? horz2 : maxHorz;
      maxVert = vert1 > maxVert ? vert1 : maxVert;
      maxVert = vert2 > maxVert ? vert2 : maxVert;

      return (
        {horz1, vert1, horz2, vert2}
      );
    });

    for (let ri = 0; ri <= maxVert; ri++) {
      rows.push([]);
      for (let ci = 0; ci <= maxHorz; ci++) {
        rows[ri].push(0); 
      }
    }

    const pairsToUse = ventLine !== null ? mappedPairs.slice(ventLine, ventLine + 1) : mappedPairs;

    pairsToUse.forEach(set => {
      const { horz1, vert1, horz2, vert2 } = set;

      if (horz1 === horz2) {
        for (let vindex = Math.min(vert1, vert2); vindex <= Math.max(vert1, vert2); vindex++) {
          rows[vindex][horz1] += 1;
        }
      } else if (vert1 === vert2) {
        for (let hindex = Math.min(horz1, horz2); hindex <= Math.max(horz1, horz2); hindex++) {
          rows[vert1][hindex] += 1;
        }
      } else if (horz1 !== horz2 && vert1 !== vert2) {
        // up or down
        let direction = horz1 > horz2 && vert1 < vert2 || horz1 < horz2 && vert1 > vert2 ? -1 : 1;

        let vindex1 = direction > 0 ? Math.min(vert1, vert2) : Math.max(vert1, vert2);
        const dist = Math.abs(horz1 - horz2);
        const hStart = Math.min(horz1, horz2);
        const hEnd = (dist + Math.min(horz1, horz2));

        for (let hindex = hStart; hindex <= hEnd; hindex += 1) {
          rows[vindex1][hindex] += 1;
          vindex1 += direction;
        }
      }
    });

    let totals = 0;

    rows.forEach(cells => {
      cells.forEach(cell => {
        if (cell > 1) {
          totals += 1;
        }
      });
    })

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} day={5} year={2021}/>
        <Body>
          <Button onClick={this.nextVentLine}>Next vent line</Button>
          <Button className="ml-3" onClick={this.togglePuzzle}>Toggle puzzle</Button>

          <div className="vent-map d-flex">
            <ul className={useRealPuzzle ? 'd-none' : 'pair-list'}>
              {
                pairsToUse.map((pair, i) => {
                  const { horz1, vert1, horz2, vert2 } = pair;
                  return (
                    <li key={`pair-${i}`}>
                      <span>{i}</span>
                      <span>horz1</span><span className="alert-danger">{horz1}</span>
                      <span>vert1</span><span className="alert-danger">{vert1}</span>
                      <span>horz2</span><span className="alert-danger">{horz2}</span>
                      <span>vert2</span><span className="alert-danger">{vert2}</span>
                    </li>
                  );
                })
              }
            </ul>
            <table >
              <thead className={useRealPuzzle ? 'd-none' : ''}>
                <tr>
                  <th></th>
                  {rows.map((a, i) => <th key={`header-${i}`}>{i}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  rows.map((row, ri) => {
                    return (
                      <tr key={`${ri}-row`}>
                        {useRealPuzzle ? null : <th>{ri}</th>}
                        {
                          row.map((cell, ci) => {

                            let cellClass = '';
                            if (cell > 0) {
                              cellClass = 'alert-success';
                            }
                            if (cell > 1) {
                              cellClass = 'alert-danger';
                            }
                            return (
                              useRealPuzzle
                                ? <td key={`${ri}-${ci}-${cell}-cell`} className={`${cellClass} small`}></td>
                                : <td key={`${ri}-${ci}-${cell}-cell`} className={cellClass}>{cell}</td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div>Cells with 2 or more: {totals}</div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
