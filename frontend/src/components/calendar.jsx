import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";

const MealCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [mealEvent, setMealEvent] = useState([]);
  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await fetch(
        `http://localhost:8000/recipe/recipes/${user.id}`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      console.log(data);
      setMealEvent(data);
    };

    fetchRecipeData();
  }, []);

  const meal = mealEvent.map((event) => {
    return {
      allDay: "false",
      id: mealEvent.id,
      title: mealEvent.title,
      start: mealEvent.date,
      end: mealEvent.date,
    };
  });

  // useEffect(() => {
  //   const fetchEvents = [];

  //   // async () => {
  //   //   try {
  //   //     const response = await fetch("http://127.0.0.1:8000/recipe/calendarevents/");
  //   //     const data = await response.json();
  //   //     setEvents(data);
  //   //   } catch (error) {
  //   //     console.error("error fetching events");
  //   //   }
  //   // };
  //   setEvents(fetchEvents);
  // }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Header />
          <div style={{ height: "500px" }}>
            <h1 style={{ color: "#123c69" }}>Calendar</h1>
            <Calendar
              localizer={localizer}
              events={meal}
              startAccessor="start_date"
              endAccessor="end_date"
              style={{ color: "#123c69" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
// https://www.npmjs.com/package/react-big-calendar
export default MealCalendar;
