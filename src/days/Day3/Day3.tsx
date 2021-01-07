import React from 'react';
import { inputTest, inputSlopes, SlopeConfig } from './Day3.inputs';
import { DayItem } from '../../shared/DayItem';

const inputTextRows = inputTest.split('\n');


const inputItems = inputTextRows.map(row => [...row.split('')]);
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


export const Day3: React.FC = () => {

  return (
    <>
      <DayItem day={ 3 } inputText={ inputTest }>
        <span key="partA">{ countTrees(inputItems, 3) }</span>
        <span key="partB">{ testSlopes(inputSlopes, inputItems) }</span>
      </DayItem>
    </>
  );
};
