const isArray = thing => {
  return typeof thing === 'object';
}

const compareLeftRight = (left, right, log = false) => {
  log &&console.log(' -Compare', left, 'vs', right);
  if (left === undefined) {
    log && console.log('   - Left side ran out of items, so inputs are in the right order');
    throw true;
  } else if (right === undefined) {
    log && console.log('   -Right side ran out of items, so inputs are not in the right order');
    throw false;
  } else if (isArray(left) || isArray(right)) {
    // log && console.log('found array, breaking into values', left, right);
    const leftList = isArray(left) ? left : [left];
    const rightList = isArray(right) ? right : [right];
    const compareLength = Math.max(leftList.length, rightList.length);

    for (let index = 0; index < compareLength; index += 1) {
      const leftItem = leftList.shift();
      const rightItem = rightList.shift();
      // log && console.log('inside the for loop at', index, 'of', compareLength);
      compareLeftRight(leftItem, rightItem, log);
    }
  } else {
    if (left < right) {
      log && console.log('   - Left side is smaller, so inputs are in the right order');
      throw true;
    }
    if (left > right) {
      log && console.log('   -Right side is smaller, so inputs are not in the right order');
      throw false;
    }
  }
}


export {
  isArray,
  compareLeftRight
}
