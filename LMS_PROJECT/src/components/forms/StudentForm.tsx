"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }).max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({ message: "Birthday is required!" })),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File).optional(),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({ type, data }: { type: "create" | "update"; data?: Partial<Inputs> }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data ? { ...data, birthday: data.birthday ? new Date(data.birthday) : undefined } : undefined,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("img", file);
    }
  };

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">{type === "create" ? "Create a new student" : "Update student"}</h1>

        <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
          <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
          <InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
        </div>

        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors?.firstName} />
          <InputField label="Last Name" name="lastName" defaultValue={data?.lastName} register={register} error={errors?.lastName} />
          <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} />
          <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors?.address} />
          <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors?.bloodType} />
          <InputField label="Birthday" name="birthday" defaultValue={data?.birthday?.toISOString().split("T")[0]} register={register} error={errors?.birthday} type="date" />

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Sex</label>
            <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </label>
            <input type="file" id="img" {...register("img")} onChange={handleImageChange} className="hidden" />
            {preview && <Image src={preview} alt="Preview" width={100} height={100} className="mt-2 rounded-md" />}
            {errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
          </div>
        </div>

        <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
      </form>
    </div>
  );
};

export default StudentForm;
