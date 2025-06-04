"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow h-[600px]">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        view={view}
        views={["work_week", "day"]}
        onView={handleOnChangeView}
        style={{ height: "100%" }}
        min={new Date(2025, 1, 1, 8, 0)}   // Feb 1, 2025, 8:00 AM
        max={new Date(2025, 1, 1, 15, 0)}  // Feb 1, 2025, 3:00 PM
        step={30}
        timeslots={2}
        popup
        toolbar
        messages={{
          work_week: "Work Week",
          day: "Day",
          next: "Next",
          previous: "Back",
          today: "Today",
          month: "Month",
          agenda: "Agenda",
        }}
      />
    </div>
  );
};

export default BigCalendar;
