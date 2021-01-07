import React from 'react';
import {
  inputTest,
} from './Day5.inputs';
import { DayItem } from '../../shared/DayItem';

const inputItems = inputTest.split('\n');

const getSeatId = (code: string) => {
  const letters = code.split('');

  const binaryArray = letters.map(l => {
    switch(l) {
      case 'F':
        return 0;
      case 'B':
        return 1;
      case 'R':
        return 1;
      case 'L':
        return 0;
    }
  });

  const binaryRowArray = binaryArray.slice(0, 7);
  const binaryColArray = binaryArray.slice(-3);
  const row = parseInt(binaryRowArray.join(''), 2);
  const col = parseInt(binaryColArray.join(''), 2);
  const res = row * 8 + col;
  // console.log({ binaryRow: binaryRowArray, binaryCol: binaryColArray, row, col, res });
  return res;
};

const getMaxSeatId = (items: Array<string>) => {
  return items.reduce((acc, item) => getSeatId(item) > acc ? getSeatId(item) : acc, 0);
};

const getMySeatId = (items: Array<string>) => {
  const seatIds = items.map(item => getSeatId(item));
  const seatIdsSorted = seatIds.sort((a, b) => a > b ? 1 : -1);
  const mySeatId = seatIdsSorted.reduce((acc, el, i, all) => {
    if(acc === 0 && i < all.length) {
      return all[i + 1] - all[i] === 2 ? all[i] + 1 : 0;
    }
    return acc;
  }, 0);
  return mySeatId;
};

export const Day5: React.FC = () => {

  return (
    <>
      <DayItem day={ 5 } inputText={ inputTest }>
        <span key="partA">{ getMaxSeatId(inputItems) }</span>
        <span key="partB">{ getMySeatId(inputItems) }</span>
      </DayItem>
    </>
  );
};
