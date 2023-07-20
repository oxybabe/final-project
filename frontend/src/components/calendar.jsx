import React, { useEffect, useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";
import Cookies from "js-cookie";
const MealCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [mealEvent, setMealEvent] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const fetchUserCalendarData = async () => {
      const response = await fetch(
        `http://localhost:8000/recipe/calendarevents/${user.id}`,
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: Cookies.get("Authorization").trim(),
          },
        }
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      console.log(data);
      setMealEvent(data);
    };

    fetchUserCalendarData();
  }, []);

  console.log({ mealEvent });

  const meals = mealEvent.map((event) => {
    // const title = window.prompt("New Event");
    return {
      allDay: true,
      id: event.id,
      title: event.recipe.title,
      start: new Date(event.start),
      resourceId: event.id + 1,
      // end: mealEvent.date,
    };
    // setMealEvent([...mealEvent, event]);
  });

  const meals2 = [
    {
      id: 0,
      title: "Board meeting",
      start: new Date(2023, 0, 29, 9, 0, 0),
      end: new Date(2023, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: "MS training",
      allDay: true,
      start: new Date(2023, 0, 29, 14, 0, 0),
      end: new Date(2023, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: "Team lead meeting",
      start: new Date(2023, 0, 29, 8, 30, 0),
      end: new Date(2023, 0, 29, 12, 30, 0),
      resourceId: [2, 3],
    },
  ];

  const resourceMap = mealEvent.map((event) => {
    return {
      resourceId: event.id + 1,
      resourceTitle: event.recipe.title,
    };
  });

  console.log({ mealEvent });
  console.log({ meals });

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      // max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Header />
          <div style={{ height: "500px" }}>
            <h1 style={{ color: "#123c69" }}>Calendar</h1>
            <Calendar
              localizer={localizer}
              events={meals}
              showAllEvents={true}
              components={components}
              showMultiDayTimes
              step={60}
              views={views}
              // startAccessor="start_date"
              // endAccessor="end_date"
              resourceIdAccessor="resourceId"
              resources={resourceMap}
              resourceTitleAccessor="resourceTitle"
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
