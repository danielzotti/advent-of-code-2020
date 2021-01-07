import React from 'react';
import { inputTest, preambleLength, preambleLengthTest } from './Day9.inputs';
import { DayItem } from '../../shared/DayItem';

// Regular Expressions to read the rules
const regexp = /^(?<operation>.{3}) (?<argument>(\+|-)\d+)$/gm;

const inputItems: Array<number> = inputTest.split('\n').map(el => parseInt(el, 10));

const checkSumInPreamble = (currentPosition: number, inputItems: Array<number>, preambleLength: number): number => {
  const preamble = inputItems.slice(currentPosition, currentPosition + preambleLength);
  const numberToCheck = inputItems[currentPosition + preambleLength];
  let isNumberInPreamble = false;
  for(let i = 0; i < preamble.length; i++) {
    const numberToFind = numberToCheck - preamble[i];
    if(numberToFind <= 0) {
      continue;
    }
    const index = preamble.findIndex(el => el === numberToFind);
    if(index !== -1 && index !== i) {
      isNumberInPreamble = true;
    }
  }
  if(!isNumberInPreamble) {
    return numberToCheck;
  }
  return checkSumInPreamble(currentPosition + 1, inputItems, preambleLength);
};

const getFirstWrongNumber = (inputItems: Array<number>) => {
  return checkSumInPreamble(0, inputItems, preambleLength);
};

const firstWrongNumber = getFirstWrongNumber(inputItems);

const checkSumInContiguousSet = (wrongNumber: number, inputItems: Array<number>) => {
  for(let start = 0; start < inputItems.length; start++) {
    for(let end = start + 1; end < inputItems.length; end++) {
      const currentSet = inputItems.slice(start, end);
      const sum = currentSet.reduce((total, el) => total += el, 0);
      // console.log(start, end, currentSet, sum, wrongNumber);
      if(sum === wrongNumber) {
        return currentSet;
      }
      if(sum > wrongNumber) {
        break;
      }
    }
  }
  return null;
}

const getContiguousSetEqualsToWrongNumber = (wrongNumber: number, inputItems: Array<number>) => {
  const set: Array<number> | null= checkSumInContiguousSet(wrongNumber, inputItems)
  const orderedSet = set?.sort((a, b) => a >= b ? 1 : -1);
  return orderedSet ? orderedSet[0] + orderedSet[orderedSet.length - 1] : null;
};

export const Day9: React.FC = () => {

  return (
    <>
      <DayItem day={ 9 } inputText={ inputTest }>
        <span key="partA"> { firstWrongNumber }</span>
        <span key="partB"> { getContiguousSetEqualsToWrongNumber(firstWrongNumber, inputItems) }</span>
      </DayItem>
    </>
  );
};
