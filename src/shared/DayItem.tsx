import React from 'react';
import { ResultItem } from './ResultItem';


export interface DayItemProps {
  day: number;
  children?: any;
  inputText: string;
}

export const DayItem: React.FC<DayItemProps> = (props) => {

  const getComponent = (key: string) => {
    return props.children.filter((comp: React.ReactElement) => {
      return comp.key === key;
    });
  };

  return (
    <div className="DayItem">
      <h3>Day{ props.day }</h3>

      <div className="day__input">
        Input: <a href={ `https://adventofcode.com/2020/day/${ props.day }` }
                  rel="noreferrer"
                  target="_blank">instructions</a>
        <textarea className="day__input__value"
                  readOnly
                  value={ props.inputText } />
      </div>
      <div className="day__results">
        <ResultItem part="A">
          { getComponent('partA') }
        </ResultItem>

        <ResultItem part="B">
          { getComponent('partB') }
        </ResultItem>
      </div>
    </div>
  );
};
