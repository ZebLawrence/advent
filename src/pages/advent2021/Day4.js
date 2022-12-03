import React, { Component } from 'react';
import { Button, Badge, Alert } from 'reactstrap';
import puzzleInput from '../../puzzles/day4-2021';
// import puzzleInput from '../../puzzles/day4-2021simple';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import BingoBoard from './BingoBoard';
import '../../assets/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    const { drawnNumbers, boards } = puzzleInput;
    this.state = {
      defaultMessage: 'Day 4 2021',
      drawIndex: 0,
      bingoNumbers: drawnNumbers.split(','),
      boards,
      winningCards: []
    };
    this.drawNext = this.drawNext.bind(this);
    this.bingoCallBack = this.bingoCallBack.bind(this);
  }

  drawNext() {
    const { drawIndex, bingoNumbers } = this.state;
    if ((drawIndex + 1) < bingoNumbers.length) {
      this.setState({ drawIndex: drawIndex + 1 });
    }
  }

  bingoCallBack(score, cardNumber) {
    const { winningCards } = this.state;
    winningCards.push({
      score,
      cardNumber
    });
    this.setState({
      winningCards
    });
  }

  render() {
    const timeStart = Date.now();
    const { defaultMessage, drawIndex, bingoNumbers, boards, winningCards } = this.state;
    const previousNumbers = [];
    const drawEnd = (drawIndex + 1) === bingoNumbers.length || winningCards.length === boards.length;

    bingoNumbers.forEach((num,ind) => {
      if (ind <= drawIndex) {
        previousNumbers.push(
          <Badge key={`badge-${num}`} className="rounded-circle" color="primary" pill >{num}</Badge>
        )
      }
    });

    const bingoBoards = boards.map((board, index) => {
      return (<BingoBoard key={`board-${index}`} bingoCallBack={this.bingoCallBack} cardNumber={index + 1} board={board} lastDraw={bingoNumbers[drawIndex]} />);
    });

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button disabled={drawEnd} color="primary" onClick={this.drawNext}>{`${drawEnd ? 'None Left' : 'Draw Next!'}`}</Button>
          <div>Last draw: <Badge className="rounded-circle" color="primary" pill >{bingoNumbers[drawIndex]}</Badge></div>
          <div>
            <div>Drawn:</div>
            <div>{previousNumbers}</div>
          </div>
          <div>Winning Cards: {winningCards.length}</div>
          <div className="winning-list">
            {
              winningCards.length && winningCards.map((card, cardIndex) => {
                const { score, cardNumber } = card;
                const color = (cardIndex + 1) === boards.length ? 'danger' : 'success';
                return (<Alert color={color}>Winning Score: {score}, from card: {cardNumber}</Alert>)
              })
            }
          </div>
          <div className="d-inline-flex justify-content-around flex-wrap">
            {bingoBoards}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
