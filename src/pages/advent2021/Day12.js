import React, { Component } from 'react';
import { Button } from 'reactstrap';
import puzzleInput from '../../puzzles/day12-2021-simple';
import puzzleInputReal from '../../puzzles/day12-2021';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import '../home/home.scss';

class Day1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultMessage: 'Day 12 2021',
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
    const { paths } = realTest ? puzzleInputReal : puzzleInput;
    const caveMap = {};
    const capTest = new RegExp(/[a-z]/);

    const isLower = letter => {
      return capTest.test(letter);
    };

    paths.forEach(connection => {
      const [from, to] = connection.split('-');
      if (!caveMap[from]) {
        caveMap[from] = [];
      }
      if (!caveMap[to]) {
        caveMap[to] = [];
      }
      caveMap[from].push(to);
      caveMap[to].push(from);
    });

    console.log('The map', caveMap);
    const foundPaths = [];
    const foundPathsPartTwo = [];

    function traverseNodes(node, visited, paths, visitedTwice) {
      visited.push(node);
      if (node === 'end') {
        paths.push(visited.join(','));
        return;
      }
  
      for (const neighbor of caveMap[node]) {
        if (neighbor === 'start') {
          continue;
        }

        if (isLower(neighbor) && visited.includes(neighbor)) { // the lowercase is in once already
          if (visitedTwice) {
            continue;
          }
          if (visited.filter((x) => x === neighbor).length >= 2) {
            continue;
          }
          traverseNodes(neighbor, [...visited], paths, true);
        } else {
          traverseNodes(neighbor, [...visited], paths, visitedTwice);
        }
      }
    }
  

    traverseNodes('start', [], foundPaths, false);

    console.log('The found paths', foundPaths);

    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        <Title message={defaultMessage} />
        <Body>
          <Button onClick={this.toggleTest}>Toggle test</Button>
          <div>
            Part two unique paths: {foundPaths.length}
          </div>
        </Body>
        <TimeTaken start={timeStart} end={timeEnd} />
      </div>
    );
  }
}

export default Day1;
