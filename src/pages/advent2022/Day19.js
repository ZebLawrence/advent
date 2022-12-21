import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import Title from '../../components/Title';
import TimeTaken from '../../components/TimeTaken';
import Body from '../../components/Body';
import {
  sample1,
  puzzle1
} from '../../puzzles/2022/day19';

function Day19() {
  const timeStart = Date.now();

  const parsePuzzle = input => {
    return input.split('\n').map(config => {
      const [name, robotCosts] = config.split(':');
      let [oreRobotRaw, clayRobotRaw, obsRobotRaw, geodeRobotRaw] = robotCosts.split('.').map(x => x.split(' '));

      const oreRobot = {
        ore: Number(oreRobotRaw[5])
      };
      const clayRobot = {
        ore: Number(clayRobotRaw[5])
      };
      const obsidianRobot = {
        ore: Number(obsRobotRaw[5]),
        clay: Number(obsRobotRaw[8])
      };
      const geodeRobot = {
        ore: Number(geodeRobotRaw[5]),
        obsidian: Number(geodeRobotRaw[8])
      };

      return ({
        blueprintId: Number(name.split(' ')[1]),
        oreRobot,
        clayRobot,
        obsidianRobot,
        geodeRobot
      });
    });
  };

  const [puzzle, setPuzzle] = useState(parsePuzzle(sample1));
  
  const executeBlueprint = blueprint => {
    // robot counts
    let oreRobots = 1;
    let clayRobots = 0;
    let obsidianRobots = 0;
    let geodeRobots = 0;
    
    // material counts
    let ores = 0;
    let clays = 0;
    let obsidians = 0;
    let geodes = 0;
    
    const {
      blueprintId,
      oreRobot,
      clayRobot,
      obsidianRobot,
      geodeRobot
    } = blueprint;

    console.log('Building blueprint', blueprintId, blueprint);

    for (let index = 1; index <= 24; index += 1) {
      console.log(`== Minute ${index} ==`);
      
      let newOreRobot = 0;
      let newClayRobot = 0;
      let newObsidianRobot = 0;
      let newGeodeRobot = 0;

    // Blueprint 1:
    //   Each ore robot costs 4 ore.
    //   Each clay robot costs 2 ore.
    //   Each obsidian robot costs 3 ore and 14 clay.
    //   Each geode robot costs 2 ore and 7 obsidian.
    
    // 7ob, 14c, 7or

    // Blueprint 2:
    //   Each ore robot costs 2 ore.
    //   Each clay robot costs 3 ore.
    //   Each obsidian robot costs 3 ore and 8 clay.
    //   Each geode robot costs 3 ore and 12 obsidian.

      // build any new robots
      // if (obsidians >= geodeRobot.obsidian && ores >= geodeRobot.ore ) {
      //   ores -= geodeRobot.ore;
      //   obsidians -= geodeRobot.obsidian;
      //   newGeodeRobot += 1;

      //   console.log(`   Spend ${geodeRobot.ore} ore and ${geodeRobot.obsidian} obsidian building Geode-cracking robot`);

      // } else if (clays >= obsidianRobot.clay && ores >= obsidianRobot.ore) {
      //   ores -= obsidianRobot.ore;
      //   clays -= obsidianRobot.clay;
      //   newObsidianRobot += 1;

      //   console.log(`   Spend ${obsidianRobot.ore} ore and ${obsidianRobot.clay} clay building obsidian Robot`);
        
      // } else if (ores >= clayRobot.ore && clayRobots < 3) {
      //   ores -= clayRobot.ore;
      //   newClayRobot += 1;
        
      //   console.log(`   Spend ${clayRobot.ore} ore building clay Robot`);
      // } else if (ores >= oreRobot.ore && clayRobots > 2) {
      //   ores -= oreRobot.ore;
      //   newOreRobot += 1;

      //   console.log(`   Spend ${oreRobot.ore} ore building ore Robot`);
      // }
      if (false) {

      }
      else if (obsidians >= geodeRobot.obsidian && ores >= geodeRobot.ore) {
        ores -= geodeRobot.ore;
        obsidians -= geodeRobot.obsidian;
        newGeodeRobot += 1;

        console.log(`   Spend ${geodeRobot.ore} ore and ${geodeRobot.obsidian} obsidian building Geode-cracking robot`);
      } 
      else if (clays >= obsidianRobot.clay && ores >= obsidianRobot.ore) {
        ores -= obsidianRobot.ore;
        clays -= obsidianRobot.clay;
        newObsidianRobot += 1;
        
        console.log(`   Spend ${obsidianRobot.ore} ore and ${obsidianRobot.clay} clay building obsidian Robot`);
      } 
      else if (ores >= clayRobot.ore && clayRobots) {
        ores -= clayRobot.ore;
        newClayRobot += 1;
        
        console.log(`   Spend ${clayRobot.ore} ore building clay Robot`);
      } 
      else if (ores >= oreRobot.ore && clayRobots) {
        ores -= oreRobot.ore;
        newOreRobot += 1;

        console.log(`   Spend ${oreRobot.ore} ore building ore Robot`);
      }

      // every existing robot collects its material
      ores += oreRobots;
      console.log(`   ${oreRobots} ore robots collected ${oreRobots} ore. You now have ${ores} ore`);

      clays += clayRobots;
      clayRobots && console.log(`   ${clayRobots} clay robots collected ${clayRobots} clay. You now have ${clays} clay`);

      obsidians += obsidianRobots;
      obsidianRobots && console.log(`   ${obsidianRobots} obsidian robots collected ${obsidianRobots} obsidian. You now have ${obsidians} obsidian`);

      geodes += geodeRobots;
      geodeRobots && console.log(`   ${geodeRobots} geode robots collected ${geodeRobots} geodes. You now have ${geodes} geodes`);

      // add new robots to robots totals
      oreRobots += newOreRobot;
      clayRobots += newClayRobot;
      obsidianRobots += newObsidianRobot;
      geodeRobots += newGeodeRobot;

    }

    return geodes;
  };

  const blueprintScores = {};
  puzzle.forEach((blueprint, index) => {
    //if (index === 0) {
      const { blueprintId } = blueprint;
      const score = executeBlueprint(blueprint);
      blueprintScores[blueprintId] = score;
    //}
  });

  let totalQuality = 0;

  Object.keys(blueprintScores).forEach(key => {
    totalQuality += blueprintScores[key];
  });

  console.log('blueprintScores', blueprintScores);
  console.log('puzzle', puzzle);

  const timeEnd = Date.now();
  return (
    <div className="advent-day">
      <Title day={19} year={2022}/>
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
          Blueprints quality {totalQuality}
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

export default Day19;
