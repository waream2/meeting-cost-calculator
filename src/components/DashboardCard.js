import React from "react";
import { Card } from 'react-rainbow-components';

const DashboardItem = ({ header, data }) => (
  <div className="mb-5 flex flex-col">
    <h1> {header}: </h1>
    <h2 className="pl-3"> {data}</h2>
  </div>
)

const DashboardCard = () => (
  <Card>
    <div className="flex flex-col py-5 px-3 h-full">
      <DashboardItem header="Total Meetings" data={0} />
      <DashboardItem header="Time Spent" data={0} />
      <DashboardItem header="Total Cost" data="$0.00" />
    </div>
  </Card>
)

export default DashboardCard