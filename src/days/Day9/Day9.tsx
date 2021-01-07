import React from 'react';
import { input, inputTest, preambleLength, preambleLengthTest } from './Day9.inputs';
import { DayItem } from '../../shared/DayItem';

// Regular Expressions to read the rules
const regexp = /^(?<operation>.{3}) (?<argument>(\+|-)\d+)$/gm;

// const inputItems: Array<number> = inputTest.split('\n').map(el => parseInt(el, 10));
const inputItems: Array<number> = input.split('\n').map(el => parseInt(el, 10));

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
  // return checkSumInPreamble(0, inputItems, preambleLengthTest);
  return checkSumInPreamble(0, inputItems, preambleLength);
};

export const Day9: React.FC = () => {

  return (
    <>
      <DayItem day={ 9 } inputText={ inputTest }>
        <span key="partA"> { getFirstWrongNumber(inputItems) }</span>
        <span key="partB"></span>
      </DayItem>
    </>
  );
};
