import React from 'react';
import { input } from './Day2.inputs';
import { DayItem } from '../../shared/DayItem';

export interface PasswordItem {
  min: number,
  max: number,
  letter: string,
  text: string
}

const inputTextRows = input.split('\n');
const inputItems = inputTextRows.map(item => {
  const parts = item.split(' ');

  const [min, max] = parts[0].split('-');
  const letter = parts[1].substring(0, 1);
  const text = parts[2];

  return {
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    letter,
    text
  } as PasswordItem;
});

const isPasswordAOk = (item: PasswordItem) => {
  const { min, max, letter, text } = item;
  const n = (text.match(new RegExp(letter, 'g')) || []).length;
  return n >= min && n <= max;
};

const isPasswordBOk = (item: PasswordItem) => {
  const { min: posA, max: posB, letter, text } = item;
  const isPosACorrect = text.charAt(posA - 1) === letter;
  const isPosBCorrect = text.charAt(posB - 1) === letter;

  return (isPosACorrect && !isPosBCorrect) || (!isPosACorrect && isPosBCorrect);  // XOR
};

export const Day2: React.FC = () => {

  return (
    <>
      <DayItem day={ 2 }>
        <pre key="input">{ inputTextRows.map(item => {
          return `${ item }
`;
        }) }</pre>
        <span key="partA">{ inputItems.reduce((acc, item) => {
          return isPasswordAOk(item) ? acc + 1 : acc;
        }, 0) }</span>
        <span key="partB">{ inputItems.reduce((acc, item) => {
          return isPasswordBOk(item) ? acc + 1 : acc;
        }, 0) }</span>
      </DayItem>
    </>
  );
};
