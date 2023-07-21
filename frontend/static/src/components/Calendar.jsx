import React, { useEffect, useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { handleError } from "../utils";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";

const MealCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [mealEvents, setMealEvents] = useState([]);
  const [showMealEvent, setShowMealEvent] = useState(false);
  const [event, setEvent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserCalendarData = async () => {
      const response = await fetch(`/recipe/calendarevents/${user.id}/`, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Authorization: Cookies.get("Authorization").trim(),
        },
      }).catch(handleError);
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      console.log(data);
      setMealEvents(data);
    };

    fetchUserCalendarData();
  }, []);

  const parseDateToRequiredCalendarFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day + 1);
  };

  const meals = mealEvents.map((event) => {
    return {
      allDay: event.all_day,
      id: event.id,
      title: event.recipe.title,
      start: parseDateToRequiredCalendarFormat(event.date),
      end: parseDateToRequiredCalendarFormat(event.date),
      resourceId: event.id + 1,
    };
  });

  const resourceMap = mealEvents.map((event) => {
    return {
      resourceId: event.id + 1,
      resourceTitle: event.recipe.title,
    };
  });

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "#f4e9cd",
      },
    });

  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  const handleShowEvent = (event) => {
    setEvent(event);
    setShowMealEvent(true);
  };
  const handleClose = () => {
    setEvent(null);
    setShowMealEvent(false);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
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
              resourceIdAccessor="resourceId"
              resources={resourceMap}
              onSelectEvent={(e) => handleShowEvent(e)}
              resourceTitleAccessor="resourceTitle"
              style={{ color: "#123c69" }}
            />
          </div>
        </div>
      </div>
      <Modal show={showMealEvent} onHide={handleClose}>
        <Modal.Header>{event?.title}</Modal.Header>
      </Modal>
    </>
  );
};
// https://www.npmjs.com/package/react-big-calendar
export default MealCalendar;
