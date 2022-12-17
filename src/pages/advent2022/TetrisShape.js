const createEmptyTetrisRow = (floor) => {
  return floor
    ? ['|','_','_','_','_','_','_','_','|']
    : ['|','.','.','.','.','.','.','.','|'];
};

class Shape {
  constructor(grid) {
    this.grid = grid;
    this.isFalling = true;
    this.currentCol = 3;
    this.currentRow = 0;
  }

  setCurrentTable (table) {
    this.table = table;
  }

  eraseRock() {
    if (this.isFalling) {
      this.contactPositions.forEach(([rowIndex, colIndex]) => {
        this.table[rowIndex][colIndex] = '.';
      });
    }
  }

  renderRock() {
    if (this.isFalling) {
      this.contactPositions = [];
      for (let ri = 0; ri < this.grid.length; ri += 1) {
        for (let ci = 0; ci < this.grid[ri].length; ci += 1) {
          const cell = this.grid[ri][ci];
          const newRow = ri + this.currentRow;
          const newCol = ci + this.currentCol;
          if (cell === '@') {
            this.contactPositions.push([newRow,newCol]);
            this.table[newRow][newCol] = cell;
          }
        }
      }
    }
  }

  addRock() {
    let topRockRow = -1;
    for (let index = 0; index < this.table.length; index += 1) {
      if (this.table[index].indexOf('#') > -1) {
        topRockRow = index;
        break;
      }
    }

    if (topRockRow > 0) {
      for (let index = 0; index < topRockRow; index += 1) {
        this.table.shift()  
      }
    }
    // the grid length should be the height of the rock
    // add 3 rows below the rock
    for (let index = 0; index < (this.grid.length + 3); index += 1) {
      this.table.unshift(createEmptyTetrisRow());
    }
    this.renderRock();
  }
  


  checkContact(){
    for (let index = (this.contactPositions.length - 1); index >= 0; index -= 1) {
      const [rowIndex, colIndex] = this.contactPositions[index];
      const symbolBelow = this.table[rowIndex + 1][colIndex];
      if (symbolBelow === '#' || symbolBelow === '_') {
        this.isFalling = false;
        break;
      }
    }
    
    if (!this.isFalling) {
      this.contactPositions.forEach(([rowIndex, cellIndex]) => {
        this.table[rowIndex][cellIndex] = '#';
      });
    }
  }

  moveLeft() {
    let contact = false;
    
    for (let index = (this.contactPositions.length - 1); index >= 0; index -= 1) {
      const [rowIndex, colIndex] = this.contactPositions[index];
      const symbolToLeft = this.table[rowIndex ][colIndex - 1];
      if (symbolToLeft === '#' || symbolToLeft === '|') {
        contact = true;
        break;
      }
    } 

    if (!contact) {
      this.eraseRock();
      this.currentCol -= 1;
      this.renderRock();
    }
  }

  moveRight() {
    let contact = false;
    
    for (let index = (this.contactPositions.length - 1); index >= 0; index -= 1) {
      const [rowIndex, colIndex] = this.contactPositions[index];
      const symbolToRight = this.table[rowIndex ][colIndex + 1];
      if (symbolToRight === '#' || symbolToRight === '|') {
        contact = true;
        break;
      }
    } 

    if (!contact) {
      this.eraseRock();
      this.currentCol += 1;
      this.renderRock();
    }
  }

  moveDown() {
    this.currentRow += 1;
    this.checkContact();
    this.eraseRock();
    this.renderRock();
  }
}

export {
  createEmptyTetrisRow,
  Shape
}