"use client";

import Image from "next/image";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Value = Date | [Date, Date];

const events = [
  {
    id: 1,
    title: "Team Meeting",
    time: "12:00 PM - 2:00 PM",
    description: "Quarterly planning session with department heads",
  },
  {
    id: 2,
    title: "Client Workshop",
    time: "3:00 PM - 5:00 PM",
    description: "Product demo and requirements gathering session",
  },
  {
    id: 3,
    title: "Webinar",
    time: "10:00 AM - 11:30 AM",
    description: "Public cloud infrastructure best practices webinar",
  },
];

const EventCalendar = () => {
  const [value, setValue] = useState<Value>(new Date());

  const handleCalendarChange: CalendarProps['onChange'] = (value) => {
    if (!value) return; // Handle null case
    setValue(value as Value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <Calendar 
        onChange={handleCalendarChange} 
        value={value}
        className="mb-6"
        tileClassName="hover:bg-blue-50 rounded-md"
        navigationLabel={({ label }) => <span className="font-semibold text-gray-700">{label}</span>}
      />
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Upcoming Events</h1>
        <Image 
          src="/moreDark.png" 
          alt="More options" 
          width={20} 
          height={20} 
          className="cursor-pointer hover:opacity-75 transition-opacity"
        />
      </div>

      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <article
            key={event.id}
            className="p-5 rounded-lg border-2 border-gray-100 border-t-4 transition-all
                     hover:border-gray-200 odd:border-t-blue-500 even:border-t-purple-500"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">{event.title}</h2>
              <time className="text-sm text-gray-400">{event.time}</time>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {event.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;