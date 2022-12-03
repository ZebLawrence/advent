import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
        Advent of code 2020
        <Link to="/day1-2020">Day 1</Link>
        <Link to="/day2-2020">Day 2</Link>
        <Link to="/day3-2020">Day 3</Link>
        <Link to="/day25-2020">Day 25</Link>
        <Link to="/tree-2020">Tree</Link>
      </div>
    );
  }
}


export default Home;
 