import React, { Component } from 'react';
import '../../assets/home.scss';

class Tree extends Component {
  constructor(props){
    super(props);
    this.state = {
      slope: 1,
      height: 3,
      defaultMessage: 'This is the message from class Home construction'
    };

    this.updateHeight = this.updateHeight.bind(this);
  }

  updateHeight(input) {
    const { value } = input.target;
    this.setState({
      height: Number(value)
    });
  }

  render() {
    const { height } = this.state;
    let totalNodes = 1;
    const treeLevels = [['*']];
    const timeStart = Date.now();
    let currentCount = 1;

    for (let index = 0; index < (height - 1); index++) {
      const level = [];
      const previousCount = treeLevels[index] || 0;
      let levelCount = previousCount.length * 2;

      for (let indexLevel = 0; indexLevel < levelCount; indexLevel++) {
        level.push('*');
        totalNodes += 1;
      }
      treeLevels.push(level);
    }

    const newTree = [...treeLevels];

    for (let index = (treeLevels.length -1); index >= 0; index--) {
      const level = treeLevels[index];
      const startCount = level.indexOf('*');
      console.log('The level is', level);

      for (let indexInner = startCount + 1; indexInner <= level.length; indexInner++) {
        const node = level[indexInner - 1];


        if (node === '*') {
          //newTree[index][indexInner - 1] = currentCount;
          if ((indexInner % 3) === 0) {
            const parentLevelIndex = newTree[index - 1].indexOf('*');

            console.log('Should move to upper level', parentLevelIndex);
            if (((parentLevelIndex + 1) % 3) === 0) {
            } else {

            }
            newTree[index - 1][parentLevelIndex] = currentCount
            currentCount += 1;
            newTree[index][indexInner - 1] = currentCount;
            console.log('The 3 divisor', indexInner);
          } else {
            console.log('The 3 not divisor', indexInner);
            newTree[index][indexInner - 1] = currentCount;
          }

        }

        if (index)
        currentCount += 1;
      }
      
    }


    const timeEnd = Date.now();
    return (
      <div className="advent-day">
        Tree
        <label>
            Height
            <input type="number" defaultValue={height} onChange={this.updateHeight} />
        </label>
        <div>Total nodes: {totalNodes}</div>
        <div className="tree-container">
          {
            newTree.map(level => {
              return (
                <div className="tree-level">
                  {
                    level.map(node => {
                      return (
                        <span className="tree-node">{node}</span>
                      );
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div>{timeEnd - timeStart}</div>
      </div>
    );
  }
}

export default Tree;
