import React from 'react';
import {
  input,
  keyValueRegexp,
  Passport,
  PassportValidation,
  requiredKeys,
  RequiredKeyTypes,
  validationObject
} from './Day4.inputs';
import { DayItem } from '../../shared/DayItem';

const inputItems = input.split(/\n{2}/);

const isPassportKeysValid = (item: string) => {
  let matches = item.matchAll(keyValueRegexp);
  const correctKeyList = [...new Set(matches)].map(match => {
    const { key } = (match as any).groups;
    return key;
  });
  const correctFieldList = correctKeyList.filter(x => requiredKeys.includes(x));
  const isValid = correctFieldList.length === requiredKeys.length;
  // console.log({
  //   correctKeyList: correctKeyList.sort(),
  //   isValid,
  //   correctFieldList: correctFieldList.sort(),
  //   requiredKeys: requiredKeys.sort()
  // });
  return isValid;
};

const checkPassportsKeysOnly = (items: Array<string>) => {
  return items.reduce((acc, item) => {
    acc += isPassportKeysValid(item) ? 1 : 0;
    return acc;
  }, 0);
};

const isPassportValid = (item: string) => {
  let matches = item.matchAll(keyValueRegexp);
  const correctKeyList = [...new Set(matches)].map(match => {
    const { key, value } = (match as any).groups;
    let k: RequiredKeyTypes = key;
    const test = validationObject[k]?.map((i: PassportValidation) => {
      console.log({
        key,
        minValid: i.min,
        maxValid: i.max,
        regexp: i.regexp,
        value,
        match: i.regexp.test(value),
        min: (i.min === undefined || (i.min && parseInt(value, 10) >= i.min)),
        max: (i.max === undefined || (i.max && parseInt(value, 10) <= i.max))
      });
      return (i.regexp.test(value) && (i.min === undefined || (i.min && parseInt(value, 10) >= i.min)) && (i.max === undefined || (i.max && parseInt(value, 10) <= i.max))) ? key : null;
    });
    return key;
  });
  const correctFieldList = correctKeyList.filter(x => requiredKeys.includes(x));
  const isValid = correctFieldList.length === requiredKeys.length;
  // console.log({
  //   correctKeyList: correctKeyList.sort(),
  //   isValid,
  //   correctFieldList: correctFieldList.sort(),
  //   requiredKeys: requiredKeys.sort()
  // });
  return isValid;
};

const checkPassports = (items: Array<string>) => {
  // return isPassportValid(items[0]);
  return items.slice(0, 10).reduce((acc, item) => {
    acc += isPassportValid(item) ? 1 : 0;
    return acc;
  }, 0);
  // return items.reduce((acc, item) => {
  //   acc += isPassportValid(item) ? 1 : 0;
  //   return acc;
  // }, 0);
};

export const Day4: React.FC = () => {

  return (
    <>
      <DayItem day={ 4 } inputText={ input }>
        <span key="partA">{ checkPassportsKeysOnly(inputItems) }</span>
        <span key="partB">{ checkPassports(inputItems) }</span>
      </DayItem>
    </>
  );
};
