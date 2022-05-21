import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import './App.css';
import MeasureMeeting from './components/MeasureMeeting'
import MeasureMeetingSecond from './components/MeasureMeetingSecond'
import AddCoworker from './components/AddCoworker';
import Header from './components/Header';
import Layout from './components/Layout';
import Home from './components/Home';
import { Card } from 'react-rainbow-components';
import { PEOPLE } from './people'


function App() {

  const [measure, setMeasure] = useState(true);
  const [meetings, setMeetings] = useState([])
  const [coworkers, setCoworkers] = useState([])
  const [seenBefore, setSeenBefore] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("meetings")) {
      const newMeetingsArray = JSON.parse(localStorage.getItem("meetings"))
      setMeetings((prev) => [...prev, ...newMeetingsArray])
    } else
      console.log('No Meetings In Storage')
  }, [])


  useEffect(() => {
    if (localStorage.getItem("coworkers")) {
      const newCoworkersArray = JSON.parse(localStorage.getItem("coworkers"))
      setCoworkers((prev) => [...prev, ...newCoworkersArray])
    } else
      console.log('No Coworkers In Storage')
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("beenherebefore")) {
      localStorage.setItem("beenherebefore", true)
    }
  }, [])



  // console.log(JSON.parse(localStorage.getItem("meetings")))

  // const addCoworkers = () => {
  //   (measure ? setMeasure(false) : setMeasure(true))
  // }


  return (
    <>
      <Layout>
        <Header copy1="Add Coworkers" copy2="New Meeting Seconds" copy3="New Measure" path="/header" />
        <Router className="w-full flex justify-center" >
          {/* <Card className="flex p-20 mr-0 w-3/4" default> */}
          <Home meetings={meetings} beenHere={seenBefore} path="/" />
          <MeasureMeetingSecond addMeeting={setMeetings} meetings={meetings} coworkers={PEOPLE} path='/measure-seconds' />
          <MeasureMeeting path='/measure-regular/' />
          <AddCoworker setCoworker={setCoworkers} coworkers={coworkers} path='/add-coworker' />
          {/* </Card> */}

        </Router>
      </Layout>
    </>
  );
}

export default App;



