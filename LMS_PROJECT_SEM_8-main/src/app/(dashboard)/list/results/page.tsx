import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type ResultListItem = {
  id: number;
  title: string;
  student: string;
  score: number;
  teacher: string;
  className: string;
  date: string;
};

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin"; // Change if needed (e.g., from props or session)
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ResultWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;
    switch (key) {
      case "studentId":
        query.studentId = value;
        break;
      case "search":
        query.OR = [
          { exam: { title: { contains: value, mode: "insensitive" } } },
          { student: { name: { contains: value, mode: "insensitive" } } },
          { student: { surname: { contains: value, mode: "insensitive" } } },
        ];
        break;
    }
  }

  const [results, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data: ResultListItem[] = results.map((item) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return null!;
    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      student: `${item.student.name} ${item.student.surname}`,
      score: item.score,
      teacher: `${assessment.lesson.teacher.name} ${assessment.lesson.teacher.surname}`,
      className: assessment.lesson.class.name,
      date: new Intl.DateTimeFormat("en-US").format(
        isExam ? assessment.startTime : assessment.startDate
      ),
    };
  }).filter(Boolean);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Student", accessor: "student" },
    { header: "Score", accessor: "score", className: "hidden md:table-cell" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Class", accessor: "className", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: ResultListItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-SanPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white p-4 rounded-md m-4 mt-0 w-full max-w-6xl ml-10 shadow-md">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
                <FormModal table="result" type="create" />
              )}
            </div>
          </div>
        </div>

        {/* TABLE */}
        {data.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={data} />
        ) : (
          <div className="text-center text-gray-500 py-8">No results found.</div>
        )}

        {/* PAGINATION */}
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default ResultListPage;
