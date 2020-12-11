import React from 'react';
import {
  Bag, bagToFind,
  input, inputTest
} from './Day7.inputs';
import { DayItem } from '../../shared/DayItem';

const regexp = /(?<key>.+) bags contain (?<values>.+ bags?,?)\./gm;
const regexpForValues = /no other bags|(?<number>\d+) (?<key>.+) bags?/gm;

const inputItems = input.split('\n');
// const inputItems = inputTest.split('\n');

const mapBagsTree = (inputItems: Array<string>) => {
  const bags: Array<Bag> = inputItems.reduce((acc, el) => {
    // el = 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    const matches = el.matchAll(regexp);

    const match = [...matches][0]?.groups;
    if(!match) {
      return [];
    }
    // key: 'light red'
    // values: '1 bright white bag, 2 muted yellow bags
    const { key, values } = match;
    const valueList = values.split(', ').reduce((acc, el) => {
      // el: '1 bright white bag'
      const matches = el.matchAll(regexpForValues);
      const match = [...matches][0]?.groups;
      if(!match) {
        return [];
      }
      const { key, number } = match;
      const item = key && number ? { key, value: parseInt(number, 10) } : null;
      return item && acc ? (acc ? [...acc, item] : [item]) : [];
    }, [] as any);
    return [
      ...acc,
      {
        key,
        children: valueList ? valueList : null
      }
    ];
  }, [] as any);
  // console.log((bags));
  return bags;
};

const countBags = (inputItems: Array<string>) => {
  const bags: Array<Bag> = mapBagsTree(inputItems);

  let currentRes = bags.filter(b => b.children.map(c => c.key).includes(bagToFind));
  let res = [...currentRes];

  while(currentRes.length > 0) {
    currentRes = bags.reduce((bags, bag) => bag.children.find(b => currentRes.map(i => i.key).includes(b.key)) ? [...bags, bag] : bags, [] as any);
    res = [...res, ...currentRes];
    // console.log({ currentRes })
    // console.log({ res })
  }
  return [...new Set([...res].map(i => i.key))].length;
};

export const Day7: React.FC = () => {

  return (
    <>
      <DayItem day={ 6 } inputText={ input }>
        <span key="partA">{ countBags(inputItems) }</span>
        <span key="partB">todo</span>
      </DayItem>
    </>
  );
};
