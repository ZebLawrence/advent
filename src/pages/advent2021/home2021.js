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
        Advent of code 2021
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
        <Link to="/day12-2021">Day 12</Link>
        <Link to="/day13-2021">Day 13</Link>
        <Link to="/day14-2021">Day 14</Link>
        <Link to="/day15-2021">Day 15</Link>
        <Link to="/day17-2021">Day 17</Link>
        <Link to="/day19-2021">Day 19</Link>
        <Link to="/day24-2021">Day 24</Link>
      </div>
    );
  }
}


export default Home;
 