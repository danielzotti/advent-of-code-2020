import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ResultItem } from './ResultItem';

export interface DayItemProps {
  day: number;
  inputText: string;
  customParseInput?: (text: string) => Array<any>;
  partA?: (items: Array<any>) => any;
  partB?: (items: Array<any>) => any;
  children?: any;
}

export const DayItem: React.FC<DayItemProps> = (props) => {

  const parseInput = props.customParseInput ? props.customParseInput : (input: string) => {
    return input.split('\n');
  };

  const [inputText, setInputText] = useState(props.inputText);
  const [inputItems, setInputItems] = useState(parseInput(props.inputText));
  const [resultPartA, setResultPartA] = useState();
  const [resultPartB, setResultPartB] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onInputTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputItems(parseInput(newText));
    setInputText(newText);
  };


  const run = (part: 'A' | 'B') => {
    setIsLoading(true);
    if(part === 'A') {
      setResultPartA(props.partA ? props.partA(inputItems) : `You must set a function for Part ${ part }`);
    }
    if(part === 'B') {
      setResultPartB(props.partB ? props.partB(inputItems) : `You must set a function for Part ${ part }`);
    }
    setIsLoading(false);
  };

  return (
    <div className="DayItem">

      <h3>Day { props.day } </h3>
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
          <button onClick={ () => run('A') } disabled={ isLoading }>{ resultPartA ? 'RE-RUN' : 'RUN' }</button>
          &nbsp;{ resultPartA }
        </ResultItem>

        <ResultItem part="B">
          <button onClick={ () => run('B') }
                  disabled={ isLoading }>{ `${ isLoading ? '♨' : '' } ${ resultPartB ? 'RE-RUN' : 'RUN' }` }</button>
          &nbsp;{ resultPartB }
        </ResultItem>
      </div>
    </div>
  );
};
