import React, { Component } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import '../home/home.scss';

class BingoBoard extends Component {
  constructor(props){
    super(props);
    const { lastDraw, board } = props;
    const rows = [];
    const cols = [];
    const allBoardNum = [];

    board.forEach((row, index) => {
      const numbers = row.split(' ');
      rows.push(numbers);

      numbers.forEach((num, colIndex) => {
        allBoardNum.push(num);

        if (index === 0) {
          cols.push([num])
        } else {
          cols[colIndex].push(num);
        }
      });
    });

    if (allBoardNum.indexOf(lastDraw) > -1) {
      allBoardNum.splice(allBoardNum.indexOf(lastDraw), 1);
    }
    const boardScore = allBoardNum.reduce((a, b) => Number(a) + Number(b)) * Number(lastDraw);

    this.state = {
      drawnNumbers: [lastDraw],
      rows,
      cols,
      allBoardNum,
      boardScore
    };
  }

  checkBingo(rows, options) {
    let bingo = false;
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (!bingo) {
        bingo = row.every((val) => options.includes(val))
      } else { break; }
    }
    return bingo;
  }

  componentDidUpdate() {
    const { lastDraw, bingoCallBack, cardNumber } = this.props;
    const { drawnNumbers, allBoardNum, rows, cols, bingo } = this.state;
    if (!bingo && drawnNumbers.indexOf(lastDraw) === -1) {
      if (allBoardNum.indexOf(lastDraw) > -1) {
        allBoardNum.splice(allBoardNum.indexOf(lastDraw), 1);
      }
      const allDrawnNumbers = [...drawnNumbers, lastDraw];
      let bingo = false;

      if (allDrawnNumbers.length > 4) {
        bingo = this.checkBingo(rows, allDrawnNumbers);
        if (!bingo) {
          bingo = this.checkBingo(cols, allDrawnNumbers);
        }
      }

      const boardScore = allBoardNum.reduce((a, b) => Number(a) + Number(b)) * Number(lastDraw);

      if (bingo && bingoCallBack) {
        bingoCallBack(boardScore, cardNumber);
      }

      this.setState({
        drawnNumbers: allDrawnNumbers,
        allBoardNum,
        boardScore,
        bingo
      })
    }
  }

  render() {
    const { drawnNumbers, rows, boardScore, bingo } = this.state;
    const { cardNumber } = this.props;
    const cardClass = bingo ? 'alert-success' : '';
    return (
      <Card className={`${cardClass} text-center bingo-container`}>
        <CardTitle tag="h5">
          Bingo Card {cardNumber}
        </CardTitle>
        <CardBody>
          <table>
            <tbody>
              {
                rows.map((row, rIndex) => {
                  return(
                    <tr key={`row-${cardNumber}-${rIndex}`}>
                      {
                        row.map(cell => {
                          const selectClass = drawnNumbers.indexOf(cell) > -1 ? 'alert-danger' : '';
                          return (<td key={`${cardNumber}-${cell}`} className={selectClass}>{cell}</td>)
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div>Score: {boardScore}</div>
        </CardBody>
      </Card>
    );
  }
}

export default BingoBoard;
