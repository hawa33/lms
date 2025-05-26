"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";

// Lazy load forms
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <p>Loading Teacher Form...</p>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading Student Form...</p>,
});

type TableType =
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";

type FormType = "create" | "update" | "delete";

interface FormModalProps {
  table: TableType;
  type: FormType;
  data?: any; 
  id?: string | number;
}

const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const [open, setOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-8";
  const hoverBg =
    type === "create"
      ? "hover:bg-SanPurpleLight"
      : type === "update"
      ? "hover:bg-SanPurple"
      : "hover:bg-red-500";

  const renderForm = () => {
    if (type === "delete" && id) {
      return (
        <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      switch (table) {
        case "teacher":
          return <TeacherForm type={type} data={data} />;
        case "student":
          return <StudentForm type={type} data={data} />;
        // Add other cases for parent, etc.
        default:
          return "Form not found!";
      }
    } else {
      return "Form not found!";
    }
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${hoverBg}`}
        onClick={() => setOpen(true)}
        aria-label={`${type} ${table}`}
      >
        <Image src={`/${type}.png`} alt={`${type} icon`} width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-40 backdrop-blur-md z-50 flex items-center justify-center">
          {/* MODAL CONTAINER */}
          <div className="bg-white p-6 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] shadow-lg">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <Image src="/close.png" alt="Close" width={16} height={16} />
            </button>

            {/* MODAL CONTENT */}
            <h2 className="text-lg font-semibold text-center">Manage {table}</h2>
            <p className="text-sm text-gray-600 text-center mt-2">
              This is a {type} modal for {table}.
            </p>

            {renderForm()}
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
