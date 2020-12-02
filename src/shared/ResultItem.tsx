import React from 'react';

export interface ResultItemProps {
  part: string;
  children?: any
}

export const ResultItem: React.FC<ResultItemProps> = (props: ResultItemProps) => {
  return (
    <div className="ResultItem">
      <span className="result-item__label">
        Part { props.part }:
      </span>
      <span className="result-item__value">
        { props.children }
      </span>
    </div>);
};
