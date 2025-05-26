"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sun", present: 21, absent: 69 },
  { name: "Mon", present: 60, absent: 40 },
  { name: "Tue", present: 70, absent: 60 },
  { name: "Wed", present: 90, absent: 75 },
  { name: "Thu", present: 90, absent: 75 },
  { name: "Fri", present: 65, absent: 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full shadow flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="More options" width={20} height={20} />
      </div>

      {/* Chart Area */}
      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="99%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#6B7280" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#6B7280" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
              cursor={{ fill: "#F3F4F6" }}
            />
            <Legend align="right" verticalAlign="top" />

            {/* Bars with updated icon-based colors */}
            <Bar
              dataKey="present"
              fill="#A2C3FF" // Light blue
              radius={[10, 10, 0, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
              legendType="circle"
            />
            <Bar
              dataKey="absent"
              fill="#FF6B6B" // Light pink
              radius={[10, 10, 0, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
              legendType="circle"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
