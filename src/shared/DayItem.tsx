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
  const [isFunctionExecuting, setIsFunctionsExecuting] = useState(false);

  const onInputTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputItems(parseInput(newText));
    setInputText(newText);
  };

  const run = () => {
    if(isFunctionExecuting) {
      console.log('You clicked when the component was loading');
      // In theory, it won't never happen because the button should be disabled
      return;
    }
    setIsFunctionsExecuting(true);
    // The code below is an ugly trick to render immediately the component when "isLoading" state changes
    // Does anyone have a better solution???
    setTimeout(() => {
      setResultPartA(props.partA ? props.partA(inputItems) : `You must set a function for Part A`);
      setResultPartB(props.partB ? props.partB(inputItems) : `You must set a function for Part B`);
      // setIsLoading(false)
      setTimeout(() => setIsFunctionsExecuting(false), 0);
    }, 0);

  };

  // ALTERNATIVE SOLUTION WITH useEffect BUT IT DOESN'T DISABLE THE BUTTON PROPERLY (TRY TO COMPULSIVELY CLICK THE BUTTON!)
  // const run = () => {
  //   if(isFunctionExecuting) {
  //     return;
  //   }
  //   setIsFunctionsExecuting(!isFunctionExecuting);
  // };
  //
  // useEffect(() => {
  //   if(!isFunctionExecuting) {
  //     return;
  //   }
  //   setResultPartA(props.partA ? props.partA(inputItems) : `You must set a function for Part A`);
  //   setResultPartB(props.partB ? props.partB(inputItems) : `You must set a function for Part B`);
  //   setIsFunctionsExecuting(false);
  // }, [isFunctionExecuting]);

  return (
    <div className="DayItem">
      <h3>Day { props.day } </h3>
      <div className="day__input">
        Input: <a href={ `https://adventofcode.com/2020/day/${ props.day }` }
                  rel="noreferrer"
                  target="_blank">instructions</a>
        <textarea className="day__input__value"
                  disabled={ isFunctionExecuting }
                  onChange={ onInputTextChange }
                  value={ inputText }/>
        { props.children }
      </div>
      <div className="day__results">
        <ResultItem part="A">
          &nbsp;{ resultPartA }
        </ResultItem>
        <ResultItem part="B">
          &nbsp;{ resultPartB }
        </ResultItem>
      </div>
      <div>
        <button onClick={ () => run() } disabled={ isFunctionExecuting } style={ { fontSize: 25, padding: 10 } }>
          { isFunctionExecuting ? 'Loading...' : 'Run it!' }</button>
      </div>
    </div>
  );
};
