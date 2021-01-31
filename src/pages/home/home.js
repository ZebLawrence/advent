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
      <div>
        Advent of code fetchingDailyStats
        <Link to="/day1">Day 1</Link>
        <Link to="/day2">Day 2</Link>
        <Link to="/day3">Day 3</Link>
        <Link to="/tree">Tree</Link>
      </div>
    );
  }
}


export default Home;
 