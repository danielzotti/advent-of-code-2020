import React from 'react';
import { inputTest, inputSlopes, SlopeConfig } from './Day3.inputs';
import { DayItem } from '../../shared/DayItem';

const getItems = (input: Array<string>) => input.map(row => [...row.split('')]);

const countTrees = (slope: Array<Array<string>>, right: number) => slope.reduce((acc, row, i) => {
  return isATree(row, i * right) ? acc + 1 : acc;
}, 0);

const isATree = (row: Array<string>, pos: number) => {
  return row[pos % row.length] === '#';
};

const testSlopes = (slopesConfig: Array<SlopeConfig>, inputItems: Array<Array<string>>) => {
  const results = slopesConfig.map(slopeConfig => {
    const items = inputItems.filter(((el, i) => i % slopeConfig.down === 0));
    return countTrees(items, slopeConfig.right);
  });
  return results.reduce((acc, el) => acc * el, 1);
};

const partA = (inputItems: Array<string>) => {
  return countTrees(getItems(inputItems), 3);
};

const partB = (inputItems: Array<string>) => {
  return testSlopes(inputSlopes, getItems(inputItems));
};

export const Day3: React.FC = () => {

  return (
    <>
      <DayItem
        day={ 3 }
        inputText={ inputTest }
        partA={ partA }
        partB={ partB }
      />
    </>
  );
};
