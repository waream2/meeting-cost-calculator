import React, { useState, useEffect } from 'react';
import { PEOPLE } from '../people';
import moment from 'moment';
import { meetings } from '../meetings';
import { Link } from '@reach/router';
import SectionHeader from './SectionHeader.js'
import Select from './Select'
import { Card } from 'react-rainbow-components'


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

const MeetingTypeToggle = ({ meetingType, updateMeeting }) => {
  return (
    <div className='border-2 w-3/4 flex justify-between'>
      <button onClick={() => updateMeeting()} className={`${meetingType === 'seconds' ? 'bg-green-500' : ''} w-1/2 flex justify-center`}>
        By Second
      </button>
      <button onClick={() => updateMeeting()} className={`${meetingType === 'preset' ? 'bg-green-500' : ''} w-1/2 flex justify-center`}>
        By Preset Time
      </button>

    </div>
  )
}




const MeasureMeetingSecond = ({ addMeeting, meetings, coworkers }) => {

  const [person, setPerson] = useState("")
  const [people, setPeople] = useState([{name: "Earn W", position: "Asshole", salary: "50000"}])
  const [duration, setDuration] = useState(0)
  const [salary, setSalary] = useState(0)
  const [cost, setCost] = useState("")
  const [duplicateError, setDuplicateError] = useState(false)
  const [totalSalaries, setTotalSalaries] = useState("50000")
  const [secondsTimer, setSecondsTimer] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const [currentMeeting, setCurrentMeeting] = useState(false)
  const [meetingType, setMeetingType] = useState('preset')
  const [costPerMinute, setCostPerMinute] = useState()

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

  useEffect(() => [
    setCostPerMinute(calculateCostPerMinute())
  ], [totalSalaries])

  useEffect(() => {
    if (localStorage.getItem("meetings")) {
      // const newArray = [...meetings, ...JSON.parse(localStorage.getItem("meetings"))]
      const newArray = JSON.parse(localStorage.getItem("meetings"))
      meetings.push(...newArray)
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

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  const getSalaries = () => {
    setTotalSalaries(0)
    people.map((p) => {
      setTotalSalaries((prev) => prev + parseInt(p.salary))
    })
  }

  const calculateCostPerSecond = () => {
    const ratePerSecond = totalSalaries / 7488000
    const secondsPrice = ratePerSecond * secondsTimer
    // const stringedPrice = toString(price)
    return secondsPrice
  }

  const calculateCostPerMinute = () => {
    return totalSalaries / 1248000
  }

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const removeFromMeeting = (e) => {
    const { value } = e.target
    const removed = people.filter((person) => person.name !== value)
    setPeople(removed)
  }

  const updateCurrentMeetingStatus = () => {
    if (timerStarted) { setCurrentMeeting(true) }
  }

  const startMeeting = () => {
    updateCurrentMeetingStatus()
    timerStarted ? setTimerStarted(false) : setTimerStarted(true)
  }

  const addCoworkerToMeeting = () => {
    coworkers.map((coworker) => {
      if (person === coworker.name) {
        if (!people.filter((check) => check.name === coworker.name).length) {
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

  const updateMeetingType = () => {
    meetingType === 'seconds' ? setMeetingType('preset') : setMeetingType('seconds')
  };

  const calculateCost = () => {
    const ratePerMinute = totalSalaries / 124800
    const price = ratePerMinute * duration
    return price
  }


  return (
    <>

      <div className="flex-col w-3/4">
        <h1 className="text-3xl mb-5">Measure Meeting Costs</h1>
        <div className="flex w-full mb-10">
          <div className="w-1/3 flex flex-col" >
            <div className="flex flex-col w-full align-start mb-10">
              <SectionHeader title="Select Coworker" />
              <Select id="people" options={PEOPLE} onSelect={(e) => setPerson(e.target.value)} selected={person} />
              <button onClick={() => addCoworkerToMeeting()} className="w-1/2 border-2"> Add To Meeting</button>
              {duplicateError && <p className="text-red-500">
                {(duplicateError) ? `${person} is already in this meeting.` : ''}
              </p>}
            </div>
            <div className="flex flex-col w-full align-start">
              <SectionHeader title="Meeting Attendees" />
              <div className="flex flex-col">
                {/* <div className='grid mt-5 grid-cols-3 gap-2 border-2 p-10 '> */}
                <div className='border-2 p-10 '>
                  {people.length === 0 && <p>There's no one in this meeting yet</p>}
                  {people.map((attendee) => {
                    return (
                      <AttendeePill key={attendee.name} name={attendee.name} removeFunction={(e) => removeFromMeeting(e)} />
                    )
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 ml-24">
            <SectionHeader title="Start A Meeting" />
            <Card className="h-full">
              <div className='flex justify-center mt-8'>
                <MeetingTypeToggle meetingType={meetingType} updateMeeting={() => updateMeetingType()} />
              </div>
              <div className=" flex flex-col h-3/4 items-center justify-center">
                {!people.length && <p>Add some coworkers to get started</p>}
                {!!(meetingType === 'seconds' && !timerStarted && people.length && !currentMeeting) &&
                  <>
                    <p>This meeting is going to cost {currencyFormat(costPerMinute)} per minute. 🙄</p>
                    <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3 disabled:opacity-50" onClick={startMeeting}> Start Meeting</button>
                  </>
                }
                {!!(meetingType === 'seconds' && timerStarted && people.length) &&
                  <>
                    <h1 className="text-xl">
                      Total Elapsed Time:
                      <br />
                      {fancyTimeFormat(secondsTimer)}
                      <br />
                      Total Accumulated Cost:
                      <br />
                      {currencyFormat(cost)}
                    </h1>
                    <button className="border bg-blue-500 text-white p-3 m-3" onClick={startMeeting}> Stop Meeting</button>
                  </>
                }
                {!!(meetingType === 'seconds' && !timerStarted && people.length && currentMeeting) &&
                  <>
                    <p>You've stopped the meeting. So far, it's cost {currencyFormat(cost)} </p>
                    <button className="border bg-blue-500 text-white p-3 m-3" onClick={startMeeting}> Continue Meeting</button>
                    <button className="border bg-green-500 text-white p-3 m-3" onClick={saveMeeting}> Save Meeting</button>
                  </>
                }
                {!!(meetingType === 'preset' && !timerStarted && people.length) &&
                  <>
                    <p>Select how long you think this meeting will be</p>
                     <select className="w-1/2 mb-3 border bg-white h-10" name="duration" onChange={e => setDuration(parseInt(e.target.value))}>
                      <option value="" selected disabled hidden>How long do you think this meeting will be?</option>
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>Hour</option>
                    </select>
                  <div>
                  {`This meeting is going to cost ${currencyFormat(calculateCost())}.`}
                  </div>
                  </>
                }
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeasureMeetingSecond;



// {coworkers.length !== 0 &&
//   <>
//     <div className="flex flex-col border rounded-lg px-auto items-center w-full px-52 py-10">
//       <label for="person"> Select Coworker </label>
//       <select name="person" className="w-full mt-3 border bg-white h-10" onChange={e => setPerson(e.target.value)}>
//         <option value="" selected disabled hidden>Whos in the meeting?</option>
//         {coworkers.map((person) => {
//           return (
//             <option key={person.name}> {person.name}</option>)
//         }
//         )
//         }
//       </select>
//       <button onClick={addCoworkerToMeeting} className="border bg-blue-500 text-white p-3 mt-5 mb-10" >Add {person} To This Meeting</button>
//       {/* </div> */}
//       <div className="w-fit ">
//         <ul>
//           <p className="text-red-500">
//             {(duplicateError) ? `${person} is already in this meeting.` : ''}
//           </p>
//           <div className="flex flex-col">
//             <h1> Meeting Attendees</h1>
//             <div className='grid mt-5 grid-cols-3 gap-2 '>
//               {people.map((attendee) => {
//                 return (
//                   <AttendeePill key={attendee.name} name={attendee.name} removeFunction={(e) => removeFromMeeting(e)} />
//                 )
//               }
//               )}
//             </div>
//           </div>
//         </ul>
//       </div>
//     </div>
//     <div>

//       <h1>
//         {!timerStarted ?
//           <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3 disabled:opacity-50" onClick={startMeeting}> Start Meeting</button> : <button disabled={!people.length} className="border bg-blue-500 text-white p-3 m-3" onClick={startMeeting}> Stop Meeting</button>
//         }
//         {(secondsTimer && cost && !timerStarted) && <button className="border bg-green-500 text-white p-3 m-3 disabled:opacity-50" onClick={saveMeeting}> Save Meeting</button>}
//         {(!people.length) && <p>Add someone to meeting to start it</p>}

//         <br />
//         {`:${secondsTimer}`}
//       </h1>
//       <h1>
//         {/* {currencyFormat(cost)} */}
//         {`${currencyFormat(calculateCostPerSecond())}`}
//       </h1>
//     </div>
//   </>
// }