import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // Hardcoded role (no auth)
  const role = "admin";

  const columns = [
    { header: "Subject", accessor: "subject" },
    { header: "Class", accessor: "class", className: "hidden md:table-cell" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action", className: "hidden md:table-cell" }]
      : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-SanPurpleLight"
    >
      <td className="p-4">{item.lesson.subject.name}</td>
      <td className="hidden md:table-cell">{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      {role === "admin" && (
        <td className="hidden md:table-cell">
          <div className="flex items-center gap-2">
            <FormModal table="exam" type="update" data={item} />
            <FormModal table="exam" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {
    lesson: {},
  };

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;
    switch (key) {
      case "classId":
        query.lesson!.classId = parseInt(value);
        break;
      case "teacherId":
        query.lesson!.teacherId = value;
        break;
      case "search":
        query.lesson!.OR = [
          { subject: { name: { contains: value, mode: "insensitive" } } },
          { teacher: { name: { contains: value, mode: "insensitive" } } },
        ];
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

 return (
  <div className="bg-gray-200 min-h-screen p-4">
    <div className="bg-white p-4 rounded-md m-4 mt-0 w-full max-w-6xl ml-10 shadow-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
              <Image src="/filter.png" alt="Filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
              <Image src="/sort.png" alt="Sort" width={20} height={20} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <Table columns={columns} renderRow={renderRow} data={data} />
      ) : (
        <div className="text-center text-gray-500 py-8">No exams found.</div>
      )}
      <Pagination page={p} count={count} />
    </div>
    </div>
  );
};

export default ExamListPage;
