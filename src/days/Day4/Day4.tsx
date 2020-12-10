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
  const correctKeyListWithNull = [...matches].map(match => {
    if(!match.groups) {
      return [];
    }
    const { key, value } = match.groups;
    const validKeys = validationObject[key as RequiredKeyTypes]?.map((i: PassportValidation) => {
      const isMinValid = (i.min === undefined || (i.min && parseInt(value, 10) >= i.min));
      const isMaxValid = (i.max === undefined || (i.max && parseInt(value, 10) <= i.max));
      const isRegexValid = i.regexp.test(value);
      // console.log({
      //   key,
      //   value,
      //   min: i.min,
      //   max: i.max,
      //   max: i.regexp,
      //   isMinValid,
      //   isMaxValid,
      //   isRegexValid,
      // });
      return (isMinValid && isMaxValid && isRegexValid);
    });
    return validKeys?.includes(true) ? key : null;
  });
  const correctKeyList = correctKeyListWithNull.filter(i => i !== null);

  const correctFieldList = (correctKeyList as Array<RequiredKeyTypes>).filter((x: RequiredKeyTypes) => requiredKeys.includes(x));
  const isValid = correctFieldList.length === requiredKeys.length;
  // console.log({
  //   correctKeyList: correctKeyList.sort(),
  //   isValid,
  //   correctFieldList: correctFieldList.sort(),
  //   requiredKeys: requiredKeys.sort()
  // });
  // console.log('\n\n\n');
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
        <span key="partA">{ checkPassportsKeysOnly(inputItems) }</span>
        <span key="partB">{ checkPassports(inputItems) }</span>
      </DayItem>
    </>
  );
};
