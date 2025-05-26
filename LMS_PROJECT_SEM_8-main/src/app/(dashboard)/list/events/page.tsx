import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import { Prisma } from "@prisma/client";

type EventListItem = {
  id: string;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin"; // Change as needed
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;
    if (key === "search") {
      query.title = { contains: value, mode: "insensitive" };
    }
  }

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);

  const data: EventListItem[] = events.map((event) => ({
    id: event.id.toString(), // <-- Convert number to string
    title: event.title,
    class: event.class?.name || "-",
    date: new Intl.DateTimeFormat("en-US").format(event.startTime),
    startTime: event.startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    endTime: event.endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }));

  const columns = [
    { header: "Event Title", accessor: "title" },
    { header: "Class", accessor: "class" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    { header: "Start Time", accessor: "startTime", className: "hidden md:table-cell" },
    { header: "End Time", accessor: "endTime", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item: EventListItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-SanPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
                <Image src="/filter.png" alt="Filter" width={20} height={20} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-SanPurple">
                <Image src="/sort.png" alt="Sort" width={20} height={20} />
              </button>
              {role === "admin" && <FormModal table="event" type="create" />}
            </div>
          </div>
        </div>

        {/* TABLE */}
        {data.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={data} />
        ) : (
          <div className="text-center text-gray-500 py-8">No events found.</div>
        )}

        {/* PAGINATION */}
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default EventListPage;
