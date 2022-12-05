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
        Advent of code 2022
        <Link to="/day1-2022">Day 1</Link>
        <Link to="/day2-2022">Day 2</Link>
        <Link to="/day3-2022">Day 3</Link>
        <Link to="/day4-2022">Day 4</Link>
        <Link to="/day5-2022">Day 5</Link>
        <Link to="/day6-2022">Day 6</Link>
      </div>
    );
  }
}


export default Home;
 