import React from 'react';
import {
  inputTest
} from './Day6.inputs';
import { DayItem } from '../../shared/DayItem';

const parseInput = (input: string) => {
  return input.split(/\n{2}/);
};

const partA = (inputItems: Array<string>) => {
  const answersList = inputItems.map(el => [...new Set(el.split('').filter(i => i !== '\n'))]);
  const countYes = answersList.reduce((acc, el) => acc + el.length, 0);
  // console.log({ answersList, count: countYes });
  return countYes;
};

const partB = (inputItems: Array<string>) => {
  const groups: Array<Array<string>> = inputItems.map(el => el.split('\n'));
  const yesIntersectionList: Array<Array<string>> = groups.map(g => {
    return g.reduce((acc, el) => {
      if(acc[0] === '') {
        return el.split('');
      }
      const intersection = acc.filter(v => el.split('').includes(v));
      return intersection;
    }, ['']);
  });
  const countYesIntersection = yesIntersectionList.reduce((acc, el) => acc + el.length, 0);
  // console.log({ yesIntersectionList, countYesIntersection });
  return countYesIntersection;
};

export const Day6: React.FC = () => {

  return (
    <>
      <DayItem
        day={ 6 }
        inputText={ inputTest }
        customParseInput={ parseInput }
        partA={ partA }
        partB={ partB }
      />
    </>
  );
};
