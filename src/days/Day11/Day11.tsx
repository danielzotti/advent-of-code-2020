import React from 'react';
import { inputTest, Seat } from './Day11.inputs';
import { DayItem } from '../../shared/DayItem';

const customParseInput = (input: string) => {
  return input.split('\n').map(i => i.split(''));
};

const adjacentSeatsPositions = [
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: -1 },
  { row: -1, col: -1 },
  { row: -1, col: 1 },
];

const getSeatValue = (arr: Array<Array<any>>, row: number, col: number): Seat => {
  try {
    return [...arr][row][col];
  } catch(e) {
    return undefined;
  }
};

const shuffleSeats = (disposition: Array<Array<string>>): Array<Array<string>> => {
  console.log('------- shuffleSeats ----------');

  const currentDisposition = [...disposition];
  const previousDisposition = [...disposition];

  let aSeatHasChanged = false;

  for(let row = 0; row < previousDisposition.length; row++) {

    for(let col = 0; col < previousDisposition.length; col++) {

      const currentSeat = getSeatValue(previousDisposition, row, col) as string;
      // currentDisposition[row][col] = currentSeat;
      if(currentSeat === '.') {
        continue;
      }
      let totalAdjacentOccupied = 0;
      for(let i = 0; i < adjacentSeatsPositions.length; i++) {
        const adj = adjacentSeatsPositions[i];
        const adjSeat = getSeatValue(previousDisposition, row + adj.row, col + adj.col);
        if(adjSeat === '#') {
          totalAdjacentOccupied++;
        }
      }

      if(currentSeat === 'L' && totalAdjacentOccupied === 0) {
        currentDisposition[row][col] = '#';
        aSeatHasChanged = true;
      } else if(currentSeat === '#' && totalAdjacentOccupied >= 4) {
        currentDisposition[row][col] = 'L';
        aSeatHasChanged = true;
      }
    }
  }
  console.log({ shuffle: currentDisposition });
  if(!aSeatHasChanged) {
    return currentDisposition;
  }
  return [...shuffleSeats([...currentDisposition])];
};

const countOccupiedSeats = (inputItems: Array<Array<string>>) => {
  return inputItems.reduce((rows, row) => {
    return rows + row.reduce((cols, col) => {
      return cols + (col === '#' ? 1 : 0);
    }, 0);
  }, 0);
};

const partA = (inputItems: Array<Array<string>>) => {
  const newSeats = shuffleSeats(inputItems);
  const occupiedSeatsCount = countOccupiedSeats(newSeats);
  console.log({ inputItems, newSeats, occupiedSeatsCount });
  return occupiedSeatsCount;
};

const partB = (inputItems: Array<Array<string>>) => {
  return 'todo';
};

export const Day11: React.FC = () => {
  return (
    <>
      <DayItem
        day={ 10 }
        customParseInput={ customParseInput }
        inputText={ inputTest }
        partA={ partA }
        partB={ partB }
      />
    </>
  );
};
