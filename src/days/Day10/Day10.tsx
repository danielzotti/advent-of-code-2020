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

  const partB = (inputItems: Array<number>) => {
    return 'todo';
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
