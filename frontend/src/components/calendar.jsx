import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = [];

    // async () => {
    //   try {
    //     const response = await fetch("http://127.0.0.1:8000/calendarevents/");
    //     const data = await response.json();
    //     setEvents(data);
    //   } catch (error) {
    //     console.error("error fetching events");
    //   }
    // };
    setEvents(fetchEvents);
  }, []);
  return (
    <>
      <Header />
      <div style={{ height: "500px" }}>
        <h1 style={{ color: "#123c69" }}>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start_date"
          endAccessor="end_date"
          style={{ color: "#123c69" }}
        />
      </div>
    </>
  );
};
// https://www.npmjs.com/package/react-big-calendar
export default MyCalendar;
