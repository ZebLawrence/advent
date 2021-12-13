import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'This is the message from class Home construction',
      totalBlocks: []
    };
  }

  render() {

    return (
      <>
        <div>
          Advent of code 2021`
          <Link to="/day1-2021">Day 1</Link>
          <Link to="/day2-2021">Day 2</Link>
          <Link to="/day3-2021">Day 3</Link>
          <Link to="/day4-2021">Day 4</Link>
          <Link to="/day5-2021">Day 5</Link>
          <Link to="/day6-2021">Day 6</Link>
          <Link to="/day7-2021">Day 7</Link>
          <Link to="/day8-2021">Day 8</Link>
          <Link to="/day9-2021">Day 9</Link>
          <Link to="/day10-2021">Day 10</Link>
          <Link to="/day11-2021">Day 11</Link>
        </div>
        <div>
          Advent of code 2020
          <Link to="/day1-2020">Day 1</Link>
          <Link to="/day2-2020">Day 2</Link>
          <Link to="/day3-2020">Day 3</Link>
          <Link to="/day25-2020">Day 25</Link>
          <Link to="/tree-2020">Tree</Link>
        </div>
      </>
    );
  }
}


export default Home;
 