import React, { useState, useEffect } from 'react';
import { PEOPLE } from '../people';
import moment from 'moment';
import { meetings } from '../meetings';
import { Link } from '@reach/router';


const AttendeePill = ({ name, removeFunction }) => {
  return (
    <div className="rounded-3xl border w-auto flex justify-between px-2 items-center mb-2">
      <p>
        {name}
      </p>
      <button onClick={removeFunction} value={name}>
        x
      </button>
    </div>
  )
}




const MeasureMeetingSecond = ({ addMeeting, meetings, coworkers }) => {

  const [person, setPerson] = useState("")
  const [people, setPeople] = useState([])
  const [duration, setDuration] = useState(0)
  const [salary, setSalary] = useState(0)
  const [cost, setCost] = useState("")
  const [duplicateError, setDuplicateError] = useState(false)
  const [totalSalaries, setTotalSalaries] = useState(0)
  const [secondsTimer, setSecondsTimer] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const [currentMeeting, setCurrentMeeting] = useState({})

  useEffect(() => {
    if (timerStarted) {
      setTimeout(() => setSecondsTimer(secondsTimer + 1), 1000)
    }
  }, [secondsTimer, timerStarted])

  useEffect(() => {
    if (!people)
      setTimerStarted(false)
  }, [people])

  useEffect(() => {
    coworkers.map((employee) => {
      if (person === employee.name) {
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

  useEffect(() => {
    if (localStorage.getItem("meetings")) {
      // const newArray = [...meetings, ...JSON.parse(localStorage.getItem("meetings"))]
      const newArray = JSON.parse(localStorage.getItem("meetings"))
      meetings.push(...newArray)
      console.log(meetings)
    }
    // console.log(meetings)
  }, [])

  // this is just here for an example to wonder why it doesn't work setting meetings = to newArrays
  // useEffect(() => {
  //   if (localStorage.getItem("meetings")) {
  //     const newArray = [...meetings, ...JSON.parse(localStorage.getItem("meetings"))]
  //     meetings[0] = newArray
  //     console.log(meetings)
  //   }
  //   // console.log(meetings)
  // }, [])

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
    const { value } = e.target
    const removed = people.filter((person) => person.name !== value)
    setPeople(removed)
  }

  const startMeeting = () => {
    timerStarted ? setTimerStarted(false) : setTimerStarted(true)
  }

  const addCoworkerToMeeting = () => {
    coworkers.map((coworker) => {
      if (person === coworker.name) {
        if (people.filter((check) => check.name === coworker.name).length === 0) {
          setPeople((prev) => ([...prev, coworker]))
        }
        else setDuplicateError(true)
      }
    })
  }

  const saveMeeting = () => {
    const meetingData = {
      attendees: people,
      length: secondsTimer,
      cost: currencyFormat(cost),
      timestamp: moment.now(),
    }
    const newMeetings = meetings
    newMeetings.push(meetingData)
    addMeeting(newMeetings)

    localStorage.removeItem("meetings")
    localStorage.setItem("meetings", JSON.stringify(newMeetings))

  }


  return (
    <>
      {/* <div className="w-full"> */}
      <div className="flex flex-col items-center justify-center mb-10  text-center ">
        <h1 className="text-2xl mb-4">Measure In Minutes</h1>
        {coworkers.length !== 0 ? <><p className="mb-5"> Use this calculator to measure exactly how much the meeting is going to cost, down to the second, based on who's in the meeting.</p>  </> : <> <p>You have to add coworkers inorder to calculate the meeting costs.</p> <Link to="/add-coworker"><button className="mt-5 border bg-blue-500 text-white p-3"> Add Coworkers</button></Link> </>}
        {coworkers.length !== 0 &&
          <>
            <div className="flex flex-col border rounded-lg px-auto items-center w-full px-52 py-10">
              <label for="person"> Select Coworker </label>
              <select name="person" className="w-full mt-3 border bg-white h-10" onChange={e => setPerson(e.target.value)}>
                <option value="" selected disabled hidden>Whos in the meeting?</option>
                {coworkers.map((person) => {
                  return (
                    <option key={person.name}> {person.name}</option>)
                }
                )
                }
              </select>
              <button onClick={addCoworkerToMeeting} className="border bg-blue-500 text-white p-3 mt-5 mb-10" >Add {person} To This Meeting</button>
              {/* </div> */}
              <div className="w-fit ">
                <ul>
                  <p className="text-red-500">
                    {(duplicateError) ? `${person} is already in this meeting.` : ''}
                  </p>
                  <div className="flex flex-col">
                    <h1> Meeting Attendees</h1>
                    <div className='grid mt-5 grid-cols-3 gap-2 '>
                      {people.map((attendee) => {
                        return (
                          <AttendeePill key={attendee.name} name={attendee.name} removeFunction={(e) => removeFromMeeting(e)} />
                        )
                      }
                      )}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
            <div>

              <h1>
                {!timerStarted ?
                  <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3 disabled:opacity-50" onClick={startMeeting}> Start Meeting</button> : <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3" onClick={startMeeting}> Stop Meeting</button>
                }
                {(secondsTimer && cost && !timerStarted) && <button className="border bg-green-500 text-white p-3 m-3 disabled:opacity-50" onClick={saveMeeting}> Save Meeting</button>}
                {(!people.length) && <p>Add someone to meeting to start it</p>}

                <br />
                {`:${secondsTimer}`}
              </h1>
              <h1>
                {/* {currencyFormat(cost)} */}
                {`${currencyFormat(calculateCostPerSecond())}`}
              </h1>
            </div>
          </>
        }
      </div>

    </>
  )
}

export default MeasureMeetingSecond;