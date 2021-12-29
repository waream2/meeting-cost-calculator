import React, { useState, useEffect } from 'react';
import {PEOPLE} from '../people';

const AttendeePill = ({name, removeFunction}) => {
  return (
    <div className="rounded-3xl border w-1/4 flex justify-between px-2 items-center">
      <p>
      {name}
      </p>
      <button onClick={removeFunction} value={name}>
      x
      </button>
    </div>
  )
}


const MeasureMeetingSecond = () => {

  const [ person, setPerson ] = useState("")
  const [ people, setPeople ] = useState([])
  const [ duration, setDuration ] = useState(0)
  const [ salary, setSalary ] = useState(0)
  const [ cost, setCost ] = useState("")
  const [ duplicateError, setDuplicateError ] = useState(false)
  const [ totalSalaries, setTotalSalaries ] = useState(0)
  const [ secondsTimer, setSecondsTimer ] = useState(0)
  const [ timerStarted, setTimerStarted ] = useState(false)

  useEffect(() => {
    if (timerStarted) {
    setTimeout(() => setSecondsTimer(secondsTimer+1), 1000)}
  }, [secondsTimer, timerStarted])

  useEffect(() => {
    if(!people)
    setTimerStarted(false)
  }, [people])

  useEffect(() => {
    PEOPLE.map((employee) => {
    if(person === employee.name) {
    setSalary(employee.salary)
    }
    setDuplicateError(false)
    // setCost(calculateCostPerSecond())

  })
  }, [person])

  useEffect(() => {
    setCost(calculateCostPerSecond())
  }, [secondsTimer])

  useEffect(() => {
    getSalaries()
  }, [people])

  const getSalaries = () => {
    setTotalSalaries(0)
    people.map((p) => {
      setTotalSalaries((prev) => prev + parseInt(p.salary))
    })
  }

  const calculateCostPerSecond = () => {
    const ratePerSecond = totalSalaries / 7488000
    const price = ratePerSecond * secondsTimer
    const stringedPrice = toString(price)
    return price
  }

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  const removeFromMeeting = (e) => {
   const {value} = e.target
   const removed = people.filter((person) => person.name !== value)
   setPeople(removed)
  }

  const startMeeting = () => {
    timerStarted ? setTimerStarted(false) : setTimerStarted(true)
  }

 const addCoworkerToMeeting = () => {
  PEOPLE.map((coworker) => {
    if(person === coworker.name) {
      if(people.filter((check)=> check.name === coworker.name).length === 0){
        setPeople((prev) => ([...prev, coworker]))
        console.log('this works?')
      }
      else setDuplicateError(true)
    }
  })
}



  return(
    <div className="w-3/4">
  <div className="flex flex-col items-center justify-center mb-10 w-full">
    <div className="flex flex-col border p-5 items-center w-full">
      <label for="person"> Select Coworker </label>
      <select name="person" className="w-1/2 mt-3 border bg-white h-10" onChange={e => setPerson(e.target.value)}>
      <option value="" selected disabled hidden>Whos in the meeting?</option>
      {PEOPLE.map((person, i) => {
        // setindex(i)
          return(
          <option key={person.name}> {person.name}</option>)}
          )
  }</select>
      <button onClick={addCoworkerToMeeting} className="border bg-blue-500 text-white p-3 m-3" >Add {person} To This Meeting</button>
      </div>
      </div>
      <div>
        <ul>
        <p className="text-red-500">
        {(duplicateError) ? `${person} is already in this meeting.` : ''}
        </p>
        <div className="flex flex-col">
          <h1> Meeting Attendees</h1>
        <div className='flex mt-5'>
        {people.map((attendee) => {
          return(

          <AttendeePill key={attendee.name} name={attendee.name} removeFunction={(e) => removeFromMeeting(e)} />
         )}
        )}
        </div>
  </div>
        </ul>
      <h1>
      {!timerStarted ?
      <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3 disabled:opacity-50" onClick={startMeeting}> Start Meeting</button> : <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3" onClick={startMeeting}> Stop Meeting</button>
      }
      {(!people.length) && <p>Add someone to meeting to start it</p> }
        <br />
       {`:${secondsTimer}`}
      </h1>
      <h1>
        {/* {currencyFormat(cost)} */}
        {`${currencyFormat(calculateCostPerSecond())}`}
      </h1>
      </div>
</div>
  )
}

export default MeasureMeetingSecond;