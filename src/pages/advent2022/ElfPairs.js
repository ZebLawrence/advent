import React from 'react';

export function ElfPairs({start1, end1, start2, end2, containsAll, overlapping}) {
  let colorClass = 'px-3 py-3 ';

  if (!overlapping && !containsAll) {
    colorClass += 'bad-result';
  }

  if (overlapping && !containsAll) {
    colorClass += 'neutral-result';
  }

  if (containsAll) {
    colorClass += 'good-result'
  }

  return (
      <div className={colorClass} style={{ lineHeight: '25px' }}>
        <div>{`${start1}-${end1}`}</div>
        <div>{`${start2}-${end2}`}</div>
      </div>
  );
}

