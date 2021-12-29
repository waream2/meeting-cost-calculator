import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MeasureMeeting from './components/MeasureMeeting'
import MeasureMeetingSecond from './components/MeasureMeetingSecond'
import AddCoworker from './components/AddCoworker';
import Header from './components/Header';
import Layout from './components/Layout'
import { Router, Link } from '@reach/router'


function App() {

  const [ measure, setMeasure ] = useState(true);

  const addCoworkers = () => {
    (measure ? setMeasure(false) : setMeasure(true))
  }


    return (
      <>
        <div className="App">
          <Layout>
            <Header addCoworker={addCoworkers} copy1="Add Coworkers" copy2="New Meeting Seconds" copy3="New Measure" path="/header" />
              <Router>
                <MeasureMeetingSecond path='/measure-seconds'/>
                <MeasureMeeting path='/measure-regular/' />
                <AddCoworker path='/add-coworker' />
              </Router>
          </Layout>
        </div>
      </>
    );
}

export default App;
