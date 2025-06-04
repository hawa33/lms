"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData, role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";

type Announcement = {
  id: number | string;
  title: string;
  class: string;
  date: string;
};

const AnnouncementListPage = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEM_PER_PAGE;

  const paginatedData = announcementsData.slice(offset, offset + ITEM_PER_PAGE);
  const totalCount = announcementsData.length;

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Class", accessor: "class" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action", className: "text-center" }]
      : []),
  ];

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-all"
    >
      <td className="flex items-center gap-3 p-3">{item.title}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      {role === "admin" && (
        <td className="text-center">
          <div className="flex items-center justify-center gap-2">
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lamaYellow"
                title="Filter"
              >
                <Image src="/filter.png" alt="Filter" width={20} height={20} />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lamaYellow"
                title="Sort"
              >
                <Image src="/sort.png" alt="Sort" width={20} height={20} />
              </button>
              {role === "admin" && <FormModal table="announcement" type="create" />}
            </div>
          </div>
        </div>

        {/* LIST */}
        {paginatedData.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={paginatedData} />
        ) : (
          <div className="text-center py-10 text-gray-500">No announcements found.</div>
        )}

        {/* PAGINATION */}
        <Pagination page={page} count={totalCount} />
      </div>
    </div>
  );
};

export default AnnouncementListPage;
