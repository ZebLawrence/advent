
class Knot {
  constructor() {
    this.positions = {
      '0-0': [0, 0]
    };
    this.coordinates = [0, 0];
    this.moves = [[0, 0]];
  }

  move(x, y) {
    this.coordinates = [x, y];
    this.moves.push([x, y]);
    this.positions[`${x}-${y}`] = [x, y];

    if (this.nextKnot) {
      this.nextKnot.parentMoved(this.coordinates);
    }
  }

  setNextKnot(nextKnot) {
    this.nextKnot = nextKnot;
  }

  shouldMove(parentX, parentY) {
    const [myX, myY] = [...this.coordinates];
    // left right and up down
    if ((Math.max(parentX, myX) - Math.min(parentX, myX) == 2) || (Math.max(parentY, myY) - Math.min(parentY, myY) == 2)) {
      return true;
    } else {
      return false;
    }
  };

  getNewCoordinates([parentX, parentY]) {
    const [myX, myY] = [...this.coordinates];
    let newX = myX;
    let newY = myY;

    const isOnSameCol = myX === parentX;
    const isOnSameRow = myY === parentY;
    const parentIsAbove = parentY > myY;
    const parentIsRight = parentX > myX;

    // needs to move up or down Y
    if (isOnSameCol && !isOnSameRow) {
      // move one up or down
      newY = parentIsAbove ? myY + 1 : myY - 1;
    } else if (!isOnSameCol && isOnSameRow) {
      // needs to move left or right X
      newX = parentIsRight ? myX + 1 : myX - 1;
    } else if (!isOnSameCol && !isOnSameRow) {
      // needs to move up down left or right diagonal
      if (parentIsAbove && parentIsRight) {
          // move up and to the right
          newX = myX + 1; 
          newY = myY + 1; 
      } else if (parentIsAbove && !parentIsRight) {
          // move up and to the left
          newX = myX - 1;
          newY = myY + 1;
      } else if (!parentIsAbove && parentIsRight) {
          // move down and to the right
          newX = myX + 1;
          newY = myY - 1;
      } else if (!parentIsAbove && !parentIsRight) {
          // move down and to the left
          newX = myX - 1;
          newY = myY -1;
      }
    }

    return ([newX, newY]);
  }

  parentMoved([x, y]) {
    // the parent knot has moved to x, y
    // should I move
    const shouldMove = this.shouldMove(x, y);
    // if I should move what are my new coordinates
    if (shouldMove) {
      const [newX, newY] = this.getNewCoordinates([x, y]);
      // if I should move pass new coordinates to 
      this.move(newX, newY);
    }
  }
}

export default Knot;
  