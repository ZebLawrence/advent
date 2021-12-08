'use strict';

function processStep(value, subjectNumber) {
  return (value * subjectNumber) % 20201227;
}

function loops(numSteps, value, subjectNumber = 7) {
  let tempVal = value;
  for (let index = 0; index < numSteps; index++) {
    tempVal = processStep(tempVal, subjectNumber);
  }
  return tempVal;
}

const cardPubKey = 18356117;
const doorPubKey = 5909654;
// const cardPubKey = 5764801;
// const doorPubKey = 17807724;
let cardTestKey = null;
let doorTestKey = null;
// let cardLoops = 1;
// let doorLoops = 1;
let cardLoops = 3974372;
let doorLoops = 8623737;

// while (cardTestKey !== cardPubKey || doorTestKey !== doorPubKey) {
//   process.stdout.write('Attempting card loop: ' + cardLoops + ', Attempting door loop: ' + doorLoops + ', Card test key: ' + cardTestKey + ', Card pub key: ' + cardPubKey + ', Door test key: ' + doorTestKey + ', Door pub key: ' + doorPubKey + '\r');

//   if (cardTestKey !== cardPubKey) {
//     cardTestKey = loops(cardLoops, 1);  
//     cardLoops = cardLoops + 1;
//   } 

//   if (doorTestKey !== doorPubKey) {
//     doorTestKey = loops(doorLoops, 1);
//     doorLoops = doorLoops + 1;
//   }
// }


// while (doorTestKey !== doorPubKey) {
//   process.stdout.write('Attempting door loop: ' + doorLoops + ', Door test key: ' + doorTestKey + ', Door pub key: ' + doorPubKey + '\r');
//   doorTestKey = processStep(tempVal, subjectNumber);
//   doorLoops + 1;
// }

cardTestKey = loops(cardLoops, 1);  
doorTestKey = loops(doorLoops, 1);

console.log('The card loops found', cardLoops);
console.log('The card key expected', cardPubKey);
console.log('The card key found', cardTestKey);
console.log('The door loops found', doorLoops);
console.log('The door key expected', doorPubKey);
console.log('The door key found', doorTestKey);

process.exit(0);


