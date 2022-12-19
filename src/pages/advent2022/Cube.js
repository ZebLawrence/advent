import { find } from 'lodash';

class Cube {
  constructor(coords, allCoords) {
    const [x, y, z] = coords;
    this.coords = coords;
    this.allCoords = allCoords
    this.x = x;
    this.y = y;
    this.z = z;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.forward = false;
    this.backward = false;
    this.touchingSides = 0;
  }

  checkCoord(testX, testY, testZ, direction) {
    const found =  find(this.allCoords, ([x, y, z]) => {
      return x === testX && y === testY && z === testZ;
    });

    if (found) {
      this[direction] = true;
      this.touchingSides += 1;
    }
  }

  checkContact() {
    // console.log('Look all directions from', this.coords);
    const [x, y, z] = this.coords;
    const directions = [
      [x, y + 1, z, 'up'], // up
      [x, y - 1, z, 'down'], // down
      [x - 1, y, z, 'left'], // left
      [x + 1, y, z, 'right'], // right
      [x, y, z - 1, 'forward'], // forward
      [x, y, z + 1, 'backward'] // backward
    ];

    directions.forEach(direction => {
      this.checkCoord(...direction);
    });

    this.openFaces = (6 - this.touchingSides);
  }
}

export default Cube;
