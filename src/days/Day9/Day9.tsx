import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { inputTest, preambleLengthTest } from './Day9.inputs';
import { DayItem } from '../../shared/DayItem';

const customParseInput = (input: string) => {
  return input.split('\n').map(i => parseInt(i));
};

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
};

const getContiguousSetEqualsToWrongNumber = (wrongNumber: number, inputItems: Array<number>) => {
  const set: Array<number> | null = checkSumInContiguousSet(wrongNumber, inputItems);
  const orderedSet = set?.sort((a, b) => a >= b ? 1 : -1);
  return orderedSet ? orderedSet[0] + orderedSet[orderedSet.length - 1] : null;
};

export const Day9: React.FC = () => {
  const [preambleLength, setPreambleLength] = useState<number>(preambleLengthTest);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());

  const partA = (inputItems: Array<number>) => {
    return preambleLength ? checkSumInPreamble(0, inputItems, preambleLength) : null;
  };

  const partB = (inputItems: Array<number>) => {
    const firstWrongNumber = partA(inputItems);
    return firstWrongNumber ? getContiguousSetEqualsToWrongNumber(firstWrongNumber, inputItems) : null;
  };

  const onPreambleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPreambleLength(parseInt(value));
    setLastUpdate(new Date().toISOString());
  };

  return (
    <>
      <DayItem
        day={ 9 }
        customParseInput={ customParseInput }
        inputText={ inputTest }
        partA={ partA }
        partB={ partB }
        lastUpdate={ lastUpdate }
      >
        <div>
          Preamble length:
          <select value={ preambleLength } onChange={ onPreambleChange }>
            <option value="5">5 (for test only)</option>
            <option value="25">25 (for personal puzzle input)</option>
          </select>
        </div>
      </DayItem>
    </>
  );
};
