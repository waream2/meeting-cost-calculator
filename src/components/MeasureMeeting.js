import React, { useState, useEffect } from 'react';
import { PEOPLE } from '../people';
import meetings from '../meetings';

const AttendeePill = ({ name, removeFunction }) => {
  return (
    <div className="rounded-3xl border w-1/4 flex justify-between px-2 items-center">
      <p>
        {name}
      </p>
      <button onClick={removeFunction}>
        x
      </button>
    </div>
  )
}


const MeasureMeeting = () => {

  const [person, setPerson] = useState("")
  const [people, setPeople] = useState([])
  const [duration, setDuration] = useState(0)
  const [salary, setSalary] = useState(0)
  const [cost, setCost] = useState("")
  const [duplicateError, setDuplicateError] = useState(false)
  const [totalSalaries, setTotalSalaries] = useState(0)
  const [currentMeeting, setCurrentMeeting] = useState([])

  useEffect(() => {
    PEOPLE.map((employee) => {
      if (person === employee.name) {
        setSalary(employee.salary)
      }
      setDuplicateError(false)
      setCost(calculateCost())

    })
  }, [person])

  useEffect(() => {
    getSalaries()
  }, [people])

  const getSalaries = () => {
    setTotalSalaries(0)
    people.map((p) => {
      setTotalSalaries((prev) => prev + parseInt(p.salary))
    })
  }

  const calculateCost = () => {
    const ratePerMinute = totalSalaries / 124800
    const price = ratePerMinute * duration
    return price
  }

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const removeFromMeeting = () => {
    alert('hello')
  }

  const addCoworkerToMeeting = (e) => {
    PEOPLE.map((coworker) => {
      if (person === coworker.name) {
        if (people.filter((check) => check.name === coworker.name).length === 0) {
          setPeople((prev) => ([...prev, coworker]))
        }
        else setDuplicateError(true)
      }
    })
  }



  return (
    <div className="flex--col w-3/4">
      <h1 className="text-3xl mb-5">Measure By The Second</h1>
      <div className="flex flex-col items-center justify-center mb-10 w-full">
        <div className="flex flex-col border p-5 items-center w-full">
          <label for="person"> Select Coworker </label>
          <select name="person" className="w-1/2 mt-3 border bg-white h-10" onChange={e => setPerson(e.target.value)}>
            <option value="" selected disabled hidden>Whos in the meeting?</option>
            {PEOPLE.map((person, i) => {
              // setindex(i)
              return (
                <option key={person.name}> {person.name}</option>)
            }
            )
            }</select>
          <label for="duration"> Select Meeting Length </label>
          <select className="w-1/2 mt-3 border bg-white h-10" name="duration" onChange={e => setDuration(parseInt(e.target.value))}>
            <option value="" selected disabled hidden>How long do you think this meeting will be?</option>
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={45}>45 Minutes</option>
            <option value={60}>Hour</option>
          </select>
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
                return (

                  <AttendeePill key={attendee.name} name={attendee.name} removeFunction={() => removeFromMeeting()} />
                )
              }
              )}
            </div>
          </div>
        </ul>

        <h1>
          <br />
          {(duration === 0) ? "We need to know how long this meeting will be to calculate cost" : `This meeting is going to cost ${currencyFormat(calculateCost())}.`}
        </h1>
      </div>
    </div>
  )
}

export default MeasureMeeting;