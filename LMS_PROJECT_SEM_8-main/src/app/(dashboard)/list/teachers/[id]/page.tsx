import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row bg-gray-200 min-h-screen">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-white py-6 px-4 rounded-md flex-1 flex gap-4 shadow-md">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Leonard Snyder</h1>
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood Type" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="Date" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* Attendance Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleAttendance.png" alt="Attendance" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* Branches Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleBranch.png" alt="Branches" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* Lessons Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleLesson.png" alt="Lessons" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* Classes Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleClass.png" alt="Classes" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 shadow-md">
          <h1 className="text-lg font-semibold mb-2">Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* Shortcuts */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-semibold">Quick Links</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-SanSkyLight" href={`/list/classes?supervisorId=${"teacher2"}`}>
              Teacher&apos;s Classes
            </Link>
            <Link className="p-3 rounded-md bg-SanPurpleLight" href={`/list/students?teacherId=${"teacher2"}`}>
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 rounded-md bg-SanYellowLight" href={`/list/lessons?teacherId=${"teacher2"}`}>
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href={`/list/exams?teacherId=${"teacher2"}`}>
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-SanSkyLight" href={`/list/assignments?teacherId=${"teacher2"}`}>
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement/>
      </div>
    </div>
  );
};

export default SingleTeacherPage;
