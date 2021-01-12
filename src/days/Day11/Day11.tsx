import React from 'react';
import { AdjacentSeatPosition, inputTest, Seat } from './Day11.inputs';
import { DayItem } from '../../shared/DayItem';

const customParseInput = (input: string) => {
  return input.split('\n').map(i => i.split(''));
};

const adjacentSeatsPositions: Array<AdjacentSeatPosition> = [
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

const shuffleSeats = (disposition: Array<Array<string>>, adjacentSeats: Array<AdjacentSeatPosition>): Array<Array<string>> => {

  const newDisposition = disposition.map((row, rowIndex, previousDisposition) =>
    row.map((col, colIndex) => {
      const currentSeat = getSeatValue(previousDisposition, rowIndex, colIndex) as string;
      if(currentSeat === '.') {
        return col;
      }
      const totalAdjacentOccupied = adjacentSeats.reduce((total, adjacentSeat) => {
        const adjSeat = getSeatValue(previousDisposition, rowIndex + adjacentSeat.row, colIndex + adjacentSeat.col);
        return adjSeat === '#' ? (total + 1) : total;
      }, 0);

      if(currentSeat === 'L' && totalAdjacentOccupied === 0) {
        return '#';
      } else if(currentSeat === '#' && totalAdjacentOccupied >= 4) {
        return 'L';
      }
      return col;
    })
  );

  const aSeatHasChanged = JSON.stringify(disposition) !== JSON.stringify(newDisposition);

  return aSeatHasChanged ? shuffleSeats(newDisposition, adjacentSeats) : newDisposition;
};

const countOccupiedSeats = (inputItems: Array<Array<string>>) => {
  return inputItems.reduce((rows, row) => {
    return rows + row.reduce((cols, col) => {
      return cols + (col === '#' ? 1 : 0);
    }, 0);
  }, 0);
};

const partA = (inputItems: Array<Array<string>>) => {
  const t0 = performance.now();
  const newSeats = shuffleSeats(inputItems, adjacentSeatsPositions);
  const t1 = performance.now();
  console.log({ newSeats, milliseconds: t1 - t0 });
  return countOccupiedSeats(newSeats);
};

export const Day11: React.FC = () => {
  return (
    <>
      <DayItem
        day={ 11 }
        customParseInput={ customParseInput }
        inputText={ inputTest }
        partA={ partA }
        // partB={ partB }
      />
    </>
  );
};
