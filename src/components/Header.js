import React, { useState } from 'react'
import { Link } from '@reach/router';

const MeasureMenu = ({ showingState, handleShow }) => (
  <div className="mx-auto flex flex-col">
    <button className="mr-5" onClick={() => handleShow(false)}>
      <Link to="/measure-seconds" >
        Measure Seconds
      </Link>
    </button>
    <button className="mr-5" onClick={() => handleShow(false)} >
      <Link to="/measure-regular">
        Measure
      </Link>
    </button>
  </div>
);

const Header = () => {

  const [showMeetingMenu, setShowMeetingMenu] = useState(false)

  const handleMeetingHover = () => {
    setShowMeetingMenu(true)
  }

  const handleMeetingLeave = () => {
    setShowMeetingMenu(false)
  }

  return (
    <div className="flex mt-5 mb-10 w-full  justify-between">
      <div>
        <button>
          <Link to="/">
            Home
          </Link>
        </button>
      </div>
      <div className='flex'>
        <button className="mr-5">
          <Link to="/add-coworker">
            Add Coworker
          </Link>
        </button>
        <div className='flex flex-col' onMouseEnter={handleMeetingHover} onMouseLeave={handleMeetingLeave}>
          <button className="mr-5" >
            Add Meeting
          </button>
          {showMeetingMenu && <MeasureMenu showingState={showMeetingMenu} handleShow={setShowMeetingMenu} />}
        </div>

      </div>
    </div>
  )
}

export default Header