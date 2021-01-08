import React from 'react';
import { inputTest } from './Day10.inputs';
import { DayItem } from '../../shared/DayItem';

const customParseInput = (input: string) => {
  return input.split('\n').map(i => parseInt(i));
};

export const Day10: React.FC = () => {

  const partA = (inputItems: Array<number>) => {
    const sortedInputs = inputItems.sort((a, b) => a >= b ? 1 : -1);

    // add built-in joltage adapter
    const allInputs = [...sortedInputs, (sortedInputs[sortedInputs.length - 1] + 3)];

    const differences = allInputs.reduce((acc, el, index, arr) => {
      return {
        ...acc,
        [el]: (el - (index > 0 ? arr[index - 1] : 0))
      };
    }, {});

    const countDifferences = Object.entries(differences).reduce((acc, [key, value], index, arr) => {
      const val = value as number;
      return {
        ...acc,
        [val]: (acc[val] ? acc[val] + 1 : 1)
      };
    }, {} as { [prop: number]: number });

    return countDifferences[1] && countDifferences[3] ? countDifferences[1] * countDifferences[3] : 0;
  };

  const countSubTree = (items: Array<number>, index: number = 0, memo = {} as { [id: number]: number }): number => {

    if(index in memo) {
      return memo[index];
    }

    const currentValue = items[index];
    // console.log(currentValue);
    if(index === items.length - 1) {
      return 1;
    }

    let total = 0;

    const nextValue = items[index + 1];
    if(nextValue !== undefined && (nextValue - currentValue <= 3)) {
      total += countSubTree(items, index + 1, memo);
    }

    const nextValue2 = items[index + 2];
    if(nextValue2 !== undefined && (nextValue2 - currentValue <= 3)) {
      total += countSubTree(items, index + 2, memo);
    }

    const nextValue3 = items[index + 3];
    if(nextValue3 !== undefined && nextValue3 - currentValue <= 3) {
      total += countSubTree(items, index + 3, memo);
    }
    memo[index] = total;
    return total;
  };

  const partB = (inputItems: Array<number>) => {
    const sortedInputs = inputItems.sort((a, b) => a >= b ? 1 : -1);

    // add built-in joltage adapter
    const allInputs = [0, ...sortedInputs, (sortedInputs[sortedInputs.length - 1] + 3)];

    const t0 = performance.now();
    const count = countSubTree(allInputs);
    const t1 = performance.now();
    // console.log(`Memoization performance: ${ t1 - t0 }ms`);

    return count;

  };


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
