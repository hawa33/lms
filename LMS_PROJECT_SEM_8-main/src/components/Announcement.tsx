"use client";

const Announcement = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Announcements</h1>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="View all announcements"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((id) => (
          <article 
            key={id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium text-gray-700">
                School Event Update #{id}
              </h2>
              <time className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                2025-01-0{id}
              </time>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Important update regarding upcoming school events and activities. 
              Please check the school portal for detailed information.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Announcement;