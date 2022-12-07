import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import { parseTextByLines } from '../../util/textParseHelpers';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day7';

function Day7() {


  function parseFolders(input) {
    const folderMap = {};
    input.split('$ cd ').filter(i => i).forEach(directorySet => {
      // console.log('Directory set', directorySet);
      const [dirName, listCommand, ...contents] = directorySet.split('\n').filter(ds => ds);

      if (dirName !== '..') {
        if (!folderMap[`dir ${dirName}`]) {
          // console.log('There was already a map for folder', dirName, folderMap[`dir ${dirName}`]);
          // console.log('Attempting to add contents', contents);
          folderMap[`dir ${dirName}`] = [];
        }

        let folderTotal = 0;
        if (folderMap[`dir ${dirName}`] && folderMap[`dir ${dirName}`][folderMap[`dir ${dirName}`].length - 1]) {
          folderTotal = folderMap[`dir ${dirName}`][folderMap[`dir ${dirName}`].length - 1];
          folderMap[`dir ${dirName}`].pop();
        }

        folderMap[`dir ${dirName}`] = [...folderMap[`dir ${dirName}`] ,...contents.map(fileOrDirName => {
          if (fileOrDirName.indexOf('dir') > -1) {
            return fileOrDirName;
          } else {
            const [size, fileName] = fileOrDirName.split(' ');
            //console.log('Adding', Number(size))
            //console.log('to', folderTotal)
            folderTotal += Number(size);
            return null;
          }
        }), folderTotal].filter(c => c);
      }

    });
    return folderMap;
  }

  const [puzzle, setPuzzle] = useState(parseFolders(puzzle1));
  const timeStart = Date.now();

  const directoryTotals = {};
  let directorysLessThan100k = 0;

  // Object.keys(puzzle).forEach(key => {
  //   let directoryTotal = 0;
  //   const sumDirectory = keyOrSize => {
  //     if(typeof keyOrSize === 'string') {
  //       puzzle[keyOrSize].forEach(sumDirectory);
  //     } else {
  //       directoryTotal += keyOrSize;
  //     }
  //   };
  //   const directoryItems = puzzle[key];
  //   directoryItems.forEach(sumDirectory);
  //   directoryTotals[key] = directoryTotal;
  //   if (directoryTotal < 100000) {
  //     directorysLessThan100k += directoryTotal;
  //   }
  // });

  console.log('The puzzle', puzzle);
  console.log('The directoryTotals', directoryTotals);

  // 863530 too low

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 7 2022" />
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseFolders(sample1))}>Sample 1</Button>
        {/* <Button size="sm" onClick={() => setPuzzle(sample2)}>Sample 2</Button>
        <Button size="sm" onClick={() => setPuzzle(sample3)}>Sample 3</Button>
        <Button size="sm" onClick={() => setPuzzle(sample4)}>Sample 4</Button>
        <Button size="sm" onClick={() => setPuzzle(sample5)}>Sample 5</Button> */}
        <Button size="sm" onClick={() => setPuzzle(parseFolders(puzzle1))}>Full Puzzle</Button>
        {/* <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button> */}
        <br />
      </Body>
      <Body>
        Directorys less than 100000 sumed {directorysLessThan100k}
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day7;
