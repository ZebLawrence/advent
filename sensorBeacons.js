'use strict';

const puzzle1 = `Sensor at x=391282, y=2038170: closest beacon is at x=-532461, y=2166525
Sensor at x=3042382, y=3783761: closest beacon is at x=3113582, y=3814857
Sensor at x=3444090, y=757238: closest beacon is at x=2930045, y=2000000
Sensor at x=971638, y=288172: closest beacon is at x=935006, y=638195
Sensor at x=2175844, y=1879176: closest beacon is at x=2930045, y=2000000
Sensor at x=3063103, y=3820576: closest beacon is at x=3113582, y=3814857
Sensor at x=2591294, y=3667337: closest beacon is at x=2768198, y=3762135
Sensor at x=2579773, y=3989626: closest beacon is at x=2768198, y=3762135
Sensor at x=2887876, y=2106773: closest beacon is at x=2930045, y=2000000
Sensor at x=2808659, y=3280271: closest beacon is at x=2768198, y=3762135
Sensor at x=2874212, y=3897058: closest beacon is at x=2768198, y=3762135
Sensor at x=720384, y=134640: closest beacon is at x=935006, y=638195
Sensor at x=489, y=1241813: closest beacon is at x=-532461, y=2166525
Sensor at x=120643, y=2878973: closest beacon is at x=227814, y=3107489
Sensor at x=3990734, y=2991891: closest beacon is at x=3924443, y=3039680
Sensor at x=1494086, y=3030634: closest beacon is at x=2537630, y=2793941
Sensor at x=1864417, y=360451: closest beacon is at x=935006, y=638195
Sensor at x=2974807, y=3732804: closest beacon is at x=3113582, y=3814857
Sensor at x=3273340, y=3998032: closest beacon is at x=3113582, y=3814857
Sensor at x=1468886, y=1597081: closest beacon is at x=935006, y=638195
Sensor at x=2083016, y=3743849: closest beacon is at x=2768198, y=3762135
Sensor at x=3387080, y=3393862: closest beacon is at x=3113582, y=3814857
Sensor at x=2959440, y=2052862: closest beacon is at x=2930045, y=2000000
Sensor at x=1180804, y=1112043: closest beacon is at x=935006, y=638195
Sensor at x=2829808, y=2206448: closest beacon is at x=2930045, y=2000000
Sensor at x=3999024, y=3114260: closest beacon is at x=3924443, y=3039680
Sensor at x=540955, y=3893312: closest beacon is at x=227814, y=3107489
Sensor at x=3669058, y=2350731: closest beacon is at x=3924443, y=3039680
Sensor at x=2915068, y=2754266: closest beacon is at x=2537630, y=2793941
Sensor at x=3507419, y=2838686: closest beacon is at x=3924443, y=3039680
Sensor at x=165939, y=498589: closest beacon is at x=935006, y=638195
Sensor at x=3917917, y=3792648: closest beacon is at x=3924443, y=3039680
Sensor at x=40698, y=3202257: closest beacon is at x=227814, y=3107489
Sensor at x=2619948, y=2439745: closest beacon is at x=2537630, y=2793941`;

const sample1 = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const parsePuzzle = input => {
  let minX = Infinity;
  let maxX = 0;
  let minY = Infinity;
  let maxY = 0;
  const sensorCoverage = {};
  let coordinatesCache = {};
  const removedBeaconCache = {};
  const coordinates = input.split('\n').map((sensorBeacon, index) => {
    let [sensorRaw, beaconRaw] = sensorBeacon.split(':');
    const sensor = sensorRaw.replace('Sensor at x=', '').replace(' y=', '').split(',').map(n => Number(n));
    const beacon = beaconRaw.replace(' closest beacon is at x=', '').replace(' y=', '').split(',').map(n => Number(n));
    const distance = Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);

    const [x, y] = sensor;
    const top = y - distance;
    const bottom = y + distance;
    const left = x - distance;
    const right = x + distance;

    
    minX = Math.min(left, minX);
    maxX = Math.max(right, maxX);
    minY = Math.min(top, minY);
    maxY = Math.max(bottom, maxY);

    console.log('On input row', index);
    for (let yIndex = top; yIndex < bottom; yIndex += 1) {

      for (let xIndex = left; xIndex < right; xIndex += 1) {

        if ((Math.abs(xIndex - x) + Math.abs(yIndex - y)) <= distance && !coordinatesCache[`${xIndex}:${yIndex}`]) {
          coordinatesCache[`${xIndex}:${yIndex}`] = 1;
      
          if (sensorCoverage[`${yIndex}`]) {
            sensorCoverage[`${yIndex}`] += 1;
          } else {
            sensorCoverage[`${yIndex}`] = 1;
          }
        }
        console.log('inner loop');
      }
    }

    if (!removedBeaconCache[`${beacon[0]}:${beacon[1]}`]) {
      removedBeaconCache[`${beacon[0]}:${beacon[1]}`] = 1;
      sensorCoverage[`${beacon[1]}`] -= 1;
    }


    return {
      sensor,
      beacon,
      distance
    };
  });
  coordinatesCache = null;
  return {
    coordinates,
    sensorCoverage,
    coordinatesCache,
    minX,
    maxX,
    minY,
    maxY
  }
};

const run = () => {
  const results = parsePuzzle(puzzle1);

  console.log('The row 10', results.sensorCoverage[10]);
  console.log('The row 2000000', results.sensorCoverage[2000000]);
};

console.log('starting');
run();

