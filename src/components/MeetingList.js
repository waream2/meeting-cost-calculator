import React from "react";

const MeetingList = ({ meetings }) => {
  console.log(meetings)
  return (
    <>
      {/* {meetings && meetings.map((meeting) => (

        <div key={meeting.cost}>

          <p>{meeting.attendees[0].name} + {meeting.attendees.length} attendees </p>
          <p>{meeting.cost}</p>
          <p>{meeting.length}</p>
        </div>
      ))} */}
    </>
  )
}

export default MeetingList

