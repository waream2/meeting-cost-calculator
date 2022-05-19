import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { meetings } from '../meetings';
import MeetingList from './MeetingList';
import { Card } from 'react-rainbow-components';
import SectionHeader from './SectionHeader.js'
import DashboardCard from './DashboardCard';
import MeetingCard from './MeetingCard';


// left over from TS
// interface Meetings {
//   attendees: {
//     name: string,
//     title: string,
//     salary: number,
//   }[],
//   cost: number,
// }[]}


const Home = (meetings) => {

  console.log()

  // useEffect(() => {
  //   if (localStorage.getItem("meetings")) {
  //     // const newArray = [...meetings, ...JSON.parse(localStorage.getItem("meetings"))]
  //     const newArray = JSON.parse(localStorage.getItem("meetings"))
  //     meetings.push(...newArray)
  //   }
  //   // console.log(meetings)
  // }, [])
  // threw this condition here just to render, come back to figure out how this needs to work.
  if (meetings) {
    return (
      <div className="flex-col">
        <h1 className="text-3xl mb-5 ">Welcome Back 👋🏾</h1>
        <div className="flex">
          <div className="w-1/3" >
            <div className="flex flex-col w-full">
              <SectionHeader title="Dashboard 📊 " />
              <DashboardCard />
            </div>
          </div>
          <div className="w-2/3 ml-24">
            <SectionHeader title="Meetings 🤝" />
            <MeetingCard />
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
        </div>
      </div >

    )
  } else
    return (<div className="flex flex-col items-center">

      <h1 className="text-3xl mb-5 ">Welcome Back</h1>
      <p className="w-1/2 mb-5"> Meetings are often shitty and always expensive. If you're like a lot of us and can't help but wonder how much money is being wasted on meetings, you're in the right place. </p>
      <MeetingList meetings={meetings} />
    </div>)
}

export default Home