import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
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
                src="/Biplob.jpg"
                alt="Student"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Biplob Devkota</h1>
              </div>
              <p className="text-sm text-gray-500">
                Dedicated student striving for excellence.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="Blood Type" width={14} height={14} />
                  <span>B+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="Date" width={14} height={14} />
                  <span>March 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={14} height={14} />
                  <span>student@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={14} height={14} />
                  <span>+1 987 654</span>
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
                <h1 className="text-xl font-semibold">95%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* Subjects Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleBranch.png" alt="Subjects" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">5th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* Assignments Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleLesson.png" alt="Lessons" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">4</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] shadow">
              <Image src="/singleClass.png" alt="Classess" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">4</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 shadow-md">
          <h1 className="text-lg font-semibold mb-2">Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* Shortcuts */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-semibold">Quick Links</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-SanSkyLight" href={`/list/teachers?classId=${2}`}>
              Student&apos;s teachers
              </Link>
            <Link className="p-3 rounded-md bg-SanPurpleLight" href="/">
              Student&apos;s Assignments
            </Link>
            <Link className="p-3 rounded-md bg-SanYellowLight" href="/">
              Student&apos;s Subjects
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Student&apos;s Exams
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement/>
      </div>
    </div>
  );
};

export default SingleStudentPage;
