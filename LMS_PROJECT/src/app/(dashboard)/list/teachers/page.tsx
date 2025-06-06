import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type TeacherList = Teacher & {
  subjects: Subject[];
  classes: Class[];
};

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
    { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
    { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noavatar.png"}
          alt="Teacher Image"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.subjects.map((s) => s.name).join(", ")}</td>
      <td className="hidden md:table-cell">{item.classes.map((c) => c.name).join(", ")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-200">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </button>
          </Link>
          <FormModal table="teacher" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.TeacherWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;
    switch (key) {
      case "classId":
        query.lessons = { some: { classId: parseInt(value) } };
        break;
      case "search":
        query.name = { contains: value, mode: "insensitive" };
        break;
      default:
        break;
    }
  }

  const [teachers, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white p-4 rounded-md m-4 mt-0 w-full max-w-6xl ml-10 shadow-md">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
                <Image src="/filter.png" alt="Filter" width={20} height={20} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
                <Image src="/sort.png" alt="Sort" width={20} height={20} />
              </button>
              {/* Add create button if needed */}
            </div>
          </div>
        </div>

        {teachers.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={teachers} />
        ) : (
          <div className="text-center text-gray-500 py-8">No teachers found.</div>
        )}

        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default TeacherListPage;
