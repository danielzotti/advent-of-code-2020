import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';
import { Day1 } from './days/Day1/Day1';
import { Day2 } from './days/Day2/Day2';
import { Day3 } from './days/Day3/Day3';
import { Day4 } from './days/Day4/Day4';
import { Day5 } from './days/Day5/Day5';
import { Day6 } from './days/Day6/Day6';
import { Day7 } from './days/Day7/Day7';
import { Day8 } from './days/Day8/Day8';
import { Day9 } from './days/Day9/Day9';

const lastDay = 9;
const days = Array.from(Array(lastDay).keys());

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Advent of code</h1>
        <ul>
          { days.map(d => (
            <li key={ d }>
              <Link to={ `/day/${ d + 1 }` }>Day { d + 1 }</Link>
            </li>
          )) }
        </ul>

        <Route exact path="/" component={ Day1 }/>
        <Route path="/day/1" component={ Day1 }/>
        <Route path="/day/2" component={ Day2 }/>
        <Route path="/day/3" component={ Day3 }/>
        <Route path="/day/4" component={ Day4 }/>
        <Route path="/day/5" component={ Day5 }/>
        <Route path="/day/6" component={ Day6 }/>
        <Route path="/day/7" component={ Day7 }/>
        <Route path="/day/8" component={ Day8 }/>
        <Route path="/day/9" component={ Day9 }/>
      </div>
    </Router>
  );
}

export default App;
