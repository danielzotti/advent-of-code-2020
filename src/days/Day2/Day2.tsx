import React from 'react';
import { inputTest, PasswordItem } from './Day2.inputs';
import { DayItem } from '../../shared/DayItem';

const getPolicy = (inputItems: Array<string>) => inputItems.map(item => {
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

const checkPasswordPartA = (items: Array<string>) => {
  return getPolicy(items).reduce((acc, item) => {
    return isPasswordAOk(item) ? acc + 1 : acc;
  }, 0);
};

const checkPasswordPartB = (items: Array<string>) => {
  return getPolicy(items).reduce((acc, item) => {
    return isPasswordBOk(item) ? acc + 1 : acc;
  }, 0);
};

export const Day2: React.FC = () => {

  return (
    <>
      <DayItem
        day={ 2 }
        inputText={ inputTest }
        partA={ checkPasswordPartA }
        partB={ checkPasswordPartB }
      />
    </>
  );
};
