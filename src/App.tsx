import React from 'react';
import './App.scss';
import { Day1 } from './days/Day1/Day1';
import { Day2 } from './days/Day2/Day2';
import { Day3 } from './days/Day3/Day3';
import { Day4 } from './days/Day4/Day4';
import { Day5 } from './days/Day5/Day5';
import { Day6 } from './days/Day6/Day6';

function App() {
  return (
    <div className="App">
      <h1>Advent of code</h1>
      <Day1 />
      <Day2 />
      <Day3 />
      <Day4 />
      <Day5 />
      <Day6 />
    </div>
  );
}

export default App;
