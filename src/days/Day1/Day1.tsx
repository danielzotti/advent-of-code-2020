import React from 'react';
import { inputTest } from './Day1.inputs';
import { DayItem } from '../../shared/DayItem';

const customParseInput = (input: string) => {
  return input.split('\n').map(i => parseInt(i));
};

const partA = (numbers: Array<number>) => {
  let data;
  for(let i = 0; i < numbers.length; i++) {
    for(let j = 0; j < numbers.length; j++) {
      if(numbers[i] + numbers[j] === 2020) {
        data = numbers[i] * numbers[j];
        break;
      }
    }
  }
  return data;
};

const partB = (numbers: Array<number>) => {
  let data;
  for(let i = 0; i < numbers.length; i++) {
    for(let j = 0; j < numbers.length; j++) {
      for(let k = 0; k < numbers.length; k++) {
        if(numbers[i] + numbers[j] + numbers[k] === 2020) {
          data = numbers[i] * numbers[j] * numbers[k];
          break;
        }
      }
    }
  }
  return data;
};

export const Day1: React.FC = () => {

  return (
    <>
      <DayItem day={ 1 }
               inputText={ inputTest }
               customParseInput={ customParseInput }
               partA={ partA }
               partB={ partB }
      />
    </>
  );
};
