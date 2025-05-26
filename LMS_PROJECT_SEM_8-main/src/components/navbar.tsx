import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-200">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center bg-white px-3 py-2 rounded-lg gap-2">
        <Image src="/search.png" alt="search" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent text-sm"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Image src="/message.png" alt="messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 relative">
          <Image src="/announcement.png" alt="announcements" width={20} height={20} />
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs font-medium leading-tight">Aanchal Baral</span>
            <span className="text-[10px] text-gray-500">Admin</span>
          </div>
          <Image
            src="/avatar.png"
            alt="user avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
