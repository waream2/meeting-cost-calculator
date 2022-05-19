import React, { useState, useEffect } from 'react';
import { isCompositeComponent } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { PEOPLE } from '../people';
import { Link } from '@reach/router'

const AddCoworker = ({ setCoworker, coworkers }) => {
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false)

  const [newCoworker, setNewCoworker] = useState({
    name: '',
    title: '',
    salary: '',
  })



  useEffect(() => {
    setSuccessMessage(false)
  }, [])

  const onChange = ({ target: { name, value } }) => {
    setSuccessMessage(false)
    setError(false)
    setNewCoworker((prev) => ({ ...prev, [name]: value }))
  }

  const submitCoworker = (e) => {
    e.preventDefault();

    const formattedCoworker = { ...newCoworker, salary: parseInt(newCoworker.salary) }
    console.log(formattedCoworker)


    if (formattedCoworker.name.length > 1 && formattedCoworker.title.length > 1 && typeof (formattedCoworker.salary) === 'number' && formattedCoworker.salary > 1) {
      const newCoworkersArray = coworkers
      newCoworkersArray.push(formattedCoworker)
      setCoworker(newCoworkersArray);
      console.log(coworkers)
      PEOPLE.push(formattedCoworker);
      setSuccessMessage(true)
      setNewCoworker({
        name: '',
        title: '',
        salary: '',
      })
      localStorage.removeItem("coworkers")
      localStorage.setItem("coworkers", JSON.stringify(newCoworkersArray));
    }
    else {
      setError(true);
    }
  };
  return (
    <div className="border rounded-lg p-5 flex flex-col items-center w-full px-52">
      <h1 className=" text-lg"> Add a New Coworker </h1>
      <p className=" text-center text-sm mb-2">
        {' '}
        Add your coworker's name, title and salary.
        You probably don't know their salary exactly,
        <br />
        but you've definitely thought about it and have an idea.
      </p>
      <form className="flex flex-col items-center justify-center w-full" onSubmit={submitCoworker}>
        <div className="flex flex-col w-full items-start">
          <label className="" htmlFor="name">Name</label>
          <input className="border mb-2 w-full rounded-md h-10" name="name" type="text" placeholder="Douche Bag" value={newCoworker.name} onChange={onChange} />
          <label className="" htmlFor="name">Title</label>
          <input className="border mb-2 w-full rounded-md h-10" name="title" type="text" placeholder="Entitled" value={newCoworker.title} onChange={onChange} />
          <label className="" htmlFor="name">Salary</label>
          <input className="border mb-2 w-full rounded-md h-10" name="salary" type="number" placeholder="$Too Much" value={newCoworker.salary} onChange={onChange} />
        </div>
        <button className="border w-1/4" type="submit">Submit</button>
      </form>
      <div className="text-red-500">
        {(error ? "There is an error, make sure you're adding coworkers name, title and salary" : '')}
      </div>
      <div className="flex flex-col text-green-500 mt-5">
        {(successMessage ? "Coworker Successfully Added" : '')}
        {(successMessage ? <Link to="/measure-seconds"><button className="text-black w-full border rounded-md" >Go Measure</button></Link> : '')}
      </div>
    </div>
  );
};

export default AddCoworker;
