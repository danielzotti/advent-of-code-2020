import React from 'react';
import { input } from './Day1.inputs';
import { DayItem } from '../../shared/DayItem';

const numbers = input.split('\n').map(i => parseInt(i));

const ifSumOf2NumbersIs2020GetProduct = (numbers: Array<number>) => {
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

const ifSumOf3NumbersIs2020GetProduct = (numbers: Array<number>) => {
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
      <DayItem day={ 1 }>
        <pre key="input">{ numbers.map(item => {
          return `${ item }
`;
        }) }</pre>
        <span key="partA">{ ifSumOf2NumbersIs2020GetProduct(numbers) }</span>
        <span key="partB">{ ifSumOf3NumbersIs2020GetProduct(numbers) }</span>
      </DayItem>
    </>
  );
};
