import Announcements from "@/components/Announcement";
import BigCalender from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";

const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col bg-gray-200 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-[740px] bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalender/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;