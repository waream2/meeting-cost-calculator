import React from "react";
import { Card } from 'react-rainbow-components';

const CoworkerItem = ({ header, title, salary }) => (
  <div className="mb-5 flex flex-col">
    <div className="flex justify-end">
      Edit
    </div>
    <h1> {header}: </h1>
    <h3 className=""> {title}</h3>
    <h3 className=""> ${salary} </h3>
  </div>
)

// TODO: need to pass in Coworkers "data" as an array of objects and reference the data in the right place
const CoworkerCards = ({ data }) => (
  <Card className="w-10/12 mr-5 mb-5">
    <div className="flex flex-col py-5 px-3">
      <CoworkerItem header={data.name} title={data.position} salary={data.salary} />
    </div>
  </Card>
)

export default CoworkerCards