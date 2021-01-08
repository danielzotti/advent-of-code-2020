import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ResultItem } from './ResultItem';

export interface DayItemProps {
  day: number;
  inputText: string;
  customParseInput?: (text: string) => Array<any>;
  partA?: (items: Array<any>) => any;
  partB?: (items: Array<any>) => any;
  children?: any;
  lastUpdate?: any;
}

export const DayItem: React.FC<DayItemProps> = (props) => {

  const parseInput = props.customParseInput ? props.customParseInput : (input: string) => {
    return input.split('\n');
  };

  const defaultPartFunction = (part: string) => `You must set a function for Part ${ part }`;

  const [inputText, setInputText] = useState(props.inputText);
  const [inputItems, setInputItems] = useState(parseInput(props.inputText));
  const [resultPartA, setResultPartA] = useState(props.partA ? props.partA(inputItems) : defaultPartFunction('A'));
  const [resultPartB, setResultPartB] = useState(props.partB ? props.partB(inputItems) : defaultPartFunction('B'));

  const onInputTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputItems(parseInput(newText));
    setInputText(newText);
  };

  useEffect(() => {
    if(props.partA) {
      setResultPartA(props.partA(inputItems));
    }
    if(props.partB) {
      setResultPartB(props.partB(inputItems));
    }
  }, [inputItems, props.lastUpdate]);

  return (
    <div className="DayItem">
      <h3>Day{ props.day } </h3>
      {/*<h6>{ props.lastUpdate }</h6>*/}

      <div className="day__input">
        Input: <a href={ `https://adventofcode.com/2020/day/${ props.day }` }
                  rel="noreferrer"
                  target="_blank">instructions</a>
        <textarea className="day__input__value"
                  onChange={ onInputTextChange }
                  value={ inputText }/>
        { props.children }
      </div>
      <div className="day__results">
        <ResultItem part="A">
          { resultPartA }
        </ResultItem>

        <ResultItem part="B">
          { resultPartB }
        </ResultItem>
      </div>
    </div>
  );
};
