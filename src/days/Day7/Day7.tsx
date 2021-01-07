import React from 'react';
import { shinyGoldBag, BagTree, inputTest } from './Day7.inputs';
import { DayItem } from '../../shared/DayItem';

// Regular Expressions to read the rules
const regexpForRule = /(?<color>.+) bags contain (?<values>.+ bags?,?)\./gm;
const regexpForInternalValues = /no other bags|(?<quantity>\d+) (?<innerColor>.+) bags?/gm;

const bagTree = (inputItems: Array<string>) => {
  const bagTree: BagTree = inputItems.reduce((tree, rule) => {

    // el = 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    const matches = rule.matchAll(regexpForRule);

    const match = [...matches][0]?.groups;
    if(!match) {
      return {};
    }
    // color: 'light red'
    // values: '1 bright white bag, 2 muted yellow bags
    const { color, values } = match;

    const innerTree = values.split(', ').reduce((innerTree, el) => {
      // el: '1 bright white bag'
      const matches = el.matchAll(regexpForInternalValues);
      const match = [...matches][0]?.groups;
      if(!match) {
        return [];
      }
      // -> quantity = 1
      // -> innerColor = 'bright white'
      const { innerColor, quantity } = match;

      return {
        ...innerTree,
        ...(innerColor && quantity) && { [innerColor]: parseInt(quantity, 10) }
      };
    }, {} as BagTree | {});
    return {
      ...tree,
      [color]: innerTree
    };
  }, {});
  return bagTree;
};

const countInnerBags = (bag: string, bags: BagTree): number => {
  return bags[bag] ? Object.entries(bags[bag]).reduce((count, [innerBagKey, quantity]) => {
    return count + quantity * countInnerBags(innerBagKey, bags);
  }, 1) : 1;
};

const partA = (inputItems: Array<string>) => {

  const bags: BagTree = bagTree(inputItems);

  let currentRes = Object.keys(bags).filter(b => Object.keys(bags[b]).includes(shinyGoldBag));
  let res = [...currentRes];
  while(currentRes.length > 0) {
    currentRes = Object.entries(bags).reduce((acc, [key, values]) => Object.keys(values).find(b => currentRes.includes(b)) ? [...acc, key] : acc, [] as any);
    res = [...res, ...currentRes];
  }
  return [...new Set(res)].length;

};

const partB = (inputItems: Array<string>) => {
  const bags = bagTree(inputItems);
  return countInnerBags(shinyGoldBag, bags) - 1;
};

export const Day7: React.FC = () => {

  return (
    <>
      <DayItem
        day={ 7 }
        inputText={ inputTest }
        partA={ partA }
        partB={ partB }
      />
    </>
  );
};
