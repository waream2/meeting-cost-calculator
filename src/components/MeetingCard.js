import React from "react";
import { Card } from 'react-rainbow-components';

const MeetingItem = ({ header, data }) => (
  <div className="mb-5 flex flex-col">
    <h1> {header}: </h1>
    <h2 className="pl-3"> {data}</h2>
  </div>
)

// TODO: need to pass in meetings "data" as an array of objects and reference the data in the right place
const MeetingCards = ({ data }) => (
  <Card className="w-1/2 mr-5">
    <div className="flex flex-col py-5 px-3">
      {/* TODO: couldnt figure out heigh parity between the two card sections so killing data lmao  */}
      {/* <MeetingItem header="Attendees" data={0} /> */}
      <MeetingItem header="Time" data={0} />
      <MeetingItem header="Cost" data="$0.00" />
      <MeetingItem header="Date" data="$0.00" />
    </div>
  </Card>
)

export default MeetingCards