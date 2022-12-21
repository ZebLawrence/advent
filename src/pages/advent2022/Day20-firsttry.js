import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { findIndex, sample } from 'lodash';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day20';

function Day20() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    return input.split('\n').map(n => {
      return({
        hasMoved: false,
        val: Number(n)
      });
    });
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  const origOrder = [...puzzle];
  let updatedList = [...puzzle];

  for (let index = 0; index < origOrder.length; index += 1) {
    const nextItemIndex = findIndex(updatedList, pi => {
      return !pi.hasMoved;
    });

    if (nextItemIndex > -1) {
      // console.log('The next item index', nextItemIndex);
      
      const nextItem = updatedList.splice(nextItemIndex, 1)[0];
      let newIndex = nextItemIndex + nextItem.val;
      nextItem.hasMoved = true;
      // console.log('Move', nextItem.val);
      // console.log('   The newIndex', newIndex);

      // if (newIndex < (origOrder.length - 1)) {
        // if (newIndex === 0) {
        //   console.log('The new index is 0', newIndex);
        //   newIndex = (origOrder.length - 1);
        // }
      //   //updatedList.splice(newIndex, 0, nextItem);
      // } else 
      if (newIndex > (origOrder.length)) {

        newIndex = newIndex % origOrder.length;
        // const multi = Math.floor(newIndex / (origOrder.length));
        // console.log('miltiply', multi);
        // newIndex = newIndex - ((origOrder.length - 1) * multi);
        // console.log('The wrap around front index', newIndex);
        // console.log('   This new index is above the range of the list');
        // console.log('The new after multi', newIndex);
      } else if (newIndex === 0) {
        // console.log('The new index is 0', newIndex);
        newIndex = (origOrder.length);
      }
      updatedList.splice(newIndex, 0, nextItem);

      // if (newIndex < 0) {
      //   // // console.log('   -the item needs to wrap around to the end', nextItemIndex + newIndex);
      //   if (Math.abs(newIndex) < origOrder.length) {
      //     // // console.log('Moving to back');

      //   } else {
      //     // // console.log('use modulo of length', newIndex % origOrder.length);
      //     newIndex =  newIndex % origOrder.length;

          
      //     if (Math.abs(newIndex) === 0) {
      //       // console.log('Moving to end rather than index 0');
      //       newIndex = origOrder.length -1;
      //     }
      //   }
      //   updatedList.splice(newIndex, 0, nextItem);

      // } else if (newIndex > origOrder.length) {
      //   // // console.log('   -needs to wrap around to the front', nextItemIndex + newIndex);
      //   newIndex = (newIndex % origOrder.length) + 1;
      //   updatedList.splice(newIndex, 0, nextItem);
      // } else {
      //   if (nextItem.val < 0 && newIndex === 0) {
      //     // moving to last item
      //     newIndex = origOrder.length -1;
      //   } 

      //   // console.log('   -just move to new index', newIndex);
      //   updatedList.splice(newIndex, 0, nextItem);
      // }

      // console.log('   The newIndex', newIndex);
      // console.log('   Order after update', updatedList.map(n => n.val).join(','));
    } else {

      console.error('Next item not found at step', index);
    }

  }

  // const getNumberAtIndex = targetIndex => {
  //   if (updatedList.length < targetIndex) {
  //     let newIndex = (targetIndex % updatedList.length);
  //     if (newIndex === 0) {
  //       newIndex = updatedList.length - 1;
  //     }
  //     console.log('The 1000th index (1000 % updatedList.length)', newIndex);
  //     return updatedList[newIndex].val;
  //   } else {
  //     console.log('pulled val using index', targetIndex);
  //     return updatedList[targetIndex].val;
  //   }    
  // };

  const zeroIndex = findIndex(updatedList, n => { return (n.val === 0); });
  let compareList = [];

  for (let index = 0; index < ((3000 + updatedList.length + zeroIndex) / updatedList.length); index += 1) {
    compareList = [...compareList, ...updatedList];
  }

  const firstIndex = (1000 + zeroIndex);
  let firstNumber = compareList[firstIndex].val;
  const secondIndex = (2000 + zeroIndex);
  let secondNumber = compareList[secondIndex].val;
  const thridIndex = (3000 + zeroIndex);
  let thirdNumber = compareList[thridIndex].val;


  // console.log('First firstIndex', firstIndex);
  // console.log('First item', compareList[firstIndex]);
  // console.log('origOrder', origOrder.map(n => n.val).join(','));
  // console.log('Order after update', updatedList.map(n => n.val).join(','));
  console.log('zeroIndex', zeroIndex);
  console.log('compareList', compareList);
  console.log('Order after update', updatedList);
  console.log('largeest', Math.max(...updatedList.map(n => n.val)));
  // console.log('puzzle', puzzle);

  // 14367 too high
 // -2249 wrong
 // -2515 wrong
 // -3280 wrong
 // 8943 wrong
  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={20} year={2022}/>
      <Body>
        <Form>
          <FormGroup>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(sample1))}>Sample 1</Button>
            <Button size="sm" onClick={() => setPuzzle(parsePuzzle(puzzle1))}>Full Puzzle</Button>
            <br />
          </FormGroup>
        </Form>
      </Body>
      <Body>
        <div>
          First: {firstNumber}, Second: {secondNumber}, Third: {thirdNumber}
          <br />
          Total: {firstNumber + secondNumber + thirdNumber}
        </div>
        <table className={`tetris-table large`}>
            <tbody>
              {/* {
                step < 1000000000000 && tetrisTable.map((row, ri) => {
                  const rowKey = `row-${ri}`;
                  return (
                    <tr key={rowKey}>
                      {
                        row.map((cell, ci) => {
                          const cellKey = `cell-${ri}-${ci}`;
                          return (
                            <td key={cellKey}>
                              {cell}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              } */}
            </tbody>
          </table>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day20;
