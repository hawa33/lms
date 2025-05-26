"use client";

import Announcement from "@/components/Announcement";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => (
  <div className="p-2 flex gap-2 flex-col md:flex-row bg-gray-200 min-h-screen">
    {/* Left Section */}
    <section className="w-full lg:w-2/3 flex flex-col gap-3" aria-label="Admin dashboard main content">
      <div className="flex gap-2 justify-between flex-wrap">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 h-[400px]">
          <CountChart />
        </div>
        <div className="w-full lg:w-2/3 h-[400px]">
          <AttendanceChart />
        </div>
      </div>

      <div className="w-full h-[400px]">
        <FinanceChart />
      </div>
    </section>

    {/* Right Section */}
    <aside className="w-full lg:w-1/3 flex flex-col gap-4" aria-label="Admin dashboard sidebar">
      <EventCalendar />
      <Announcement />
    </aside>
  </div>
);

export default AdminPage;
