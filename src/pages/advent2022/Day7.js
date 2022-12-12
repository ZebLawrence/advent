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

  const parseCommand = (lineInput, workingDir, directoryTree) => {
    if (lineInput[0] === 'cd') {
        const argument = lineInput[1];
        if (argument === '/') {
          workingDir = directoryTree;
        } else if (argument === '..') {
          workingDir = workingDir.parent;
        } else if (argument.match(/[a-z]/)) {
          workingDir = workingDir.children.find(x => x.name === argument);
        }
    }
 
    return workingDir;
  }
  
  const parseDir = (lineInput, workingDir) => 
      workingDir.children.push({ name: lineInput[0], children: [], files: [], parent: workingDir });
  
  const parseFile = (lineInput, showingDir) => 
      showingDir.files.push({ size: parseInt(lineInput[0]), name: lineInput[1]});
  
  const getFolderSizes = ({ name, files, children }) => {
      const size = files.reduce((prev, curr) => prev += curr.size, 0);
      const childDirectories = children.map(getFolderSizes);
      const childDirectoriesSize = childDirectories.map(x => x[0]).reduce((prev, curr) => prev += curr.size, 0);
  
      return [{ name, size: size + childDirectoriesSize }, ...childDirectories.flat()];
  }

  const [puzzle, setPuzzle] = useState(parseTextByLines(sample1));
  const timeStart = Date.now();

  const directoryTree = { name: '/', children: [], files: [], parent: null };
  let workingDir = directoryTree;

  for(const command of puzzle) {
      const lineInput = command.split(' ');

      if (lineInput[0] === '$') {
          workingDir = parseCommand(lineInput.slice(1), workingDir, directoryTree);
      }
      else if (lineInput[0] === 'dir') {
          parseDir(lineInput.slice(1), workingDir);
      }
      else if (lineInput[0].match(/[0-9]/)) {
          parseFile(lineInput, workingDir);
      }
  }

  const folders = getFolderSizes(directoryTree);

  const directorysLessThan100k = folders
    .filter(x => x.size <= 100000)
    .reduce((prev, curr) => prev + curr.size , 0);

  const requiredRootFolderSize = 30000000;
  const freeSpace = 70000000 - folders.find(x => x.name === '/').size;
  const sizeToDelete = requiredRootFolderSize - freeSpace;
  const directoryToDelete = folders
    .filter(x => x.size - sizeToDelete > 0)
    .sort((a, b) => sizeToDelete - a.size < sizeToDelete - b.size ? 1 : -1)[0].size;


  const renderFolders = ({ name, files, children}) => {
    const list = [<li>📂 {name}</li>];

    if (children && children.length) {
      list.push(<li>{children.map(renderFolders)}</li>);
    }

    if (files && files.length) {
      files.forEach(({ size, name: fileName }) => {
        list.push(<li>📄 {fileName} : <span className="text-muted font-italic">{size}</span></li>);
      });
    }

    return (
      <ul className="files">{list}</ul>
    );
  };

  const renderedFolders = renderFolders(directoryTree);

  console.log('The directory tree', directoryTree);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title message="Day 7 2022" day={7} year={2022}/>
      <Body>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(sample1))}>Sample 1</Button>
        <Button size="sm" onClick={() => setPuzzle(parseTextByLines(puzzle1))}>Full Puzzle</Button>
        <br />
      </Body>
      <Body>
        Directories less than 100000 sumed {directorysLessThan100k}
        <br />
        Delete directory of size {directoryToDelete}
        <div>{renderedFolders}</div>
      </Body>
      <TimeTaken start={timeStart} end={timeEnd} />
    </div>
  );
}

export default Day7;
