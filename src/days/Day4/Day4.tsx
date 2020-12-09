import React from 'react';
import { input, optionalKeys, requiredKeys, validKeys } from './Day4.inputs';
import { DayItem } from '../../shared/DayItem';

const inputItems = input.split(/\n{2}/);

const isPassportValid = (item: string) => {
  const regexp = /(?<key>\S+):(?<value>\S+)+\s?/gm;
  let matches = item.matchAll(regexp);
  const keyList = [...new Set(matches)].map(match => {
    const { key } = (match as any).groups;
    return key;
  });
  const correctFieldList = keyList.filter(x => requiredKeys.includes(x));
  const isValid = correctFieldList.length === requiredKeys.length;
  // console.log({
  //   keyList: keyList.sort(),
  //   isValid,
  //   correctFieldList: correctFieldList.sort(),
  //   requiredKeys: requiredKeys.sort()
  // });
  return isValid;
};

const checkPassports = (items: Array<string>) => {
  return items.reduce((acc, item) => {
    acc += isPassportValid(item) ? 1 : 0;
    return acc;
  }, 0);
};

export const Day4: React.FC = () => {

  return (
    <>
      <DayItem day={ 4 } inputText={ input }>
        <span key="partA">{ checkPassports(inputItems) }</span>
        <span key="partB">&nbsp;</span>
      </DayItem>
    </>
  );
};
