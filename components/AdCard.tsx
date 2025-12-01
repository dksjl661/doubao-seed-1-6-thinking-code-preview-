import Image from "next/image";

export default function AdCard() {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden cursor-pointer h-full flex flex-col font-roboto hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-900 font-normal">
              and Gemini in
            </span>
            <div className="relative w-12 h-5">
              {/* Placeholder for Gemini/Google styled M logo text if image not available */}
              <span
                className="text-xl font-bold text-gray-800"
                style={{ fontFamily: "Product Sans, sans-serif" }}
              >
                M
              </span>
              <span className="absolute -top-1 -right-1 text-blue-600 text-xl">
                ✨
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center my-2">
          {/* Center visual - Blue star/sparkle */}
          <div className="w-16 h-16 text-blue-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-900 font-medium leading-5 mb-2">
            Get 2 TB storage, Gemini in Pro, and Gemini in Gmail, Docs and more.
            Try at no charge.
          </p>
          <div className="flex items-center space-x-1 mb-3">
            <span className="font-bold text-xs text-black bg-[#F1F1F1] px-1 rounded-[2px]">
              Ad
            </span>
            <span className="text-xs text-gray-600">
              Sponsored • Google One
            </span>
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-blue-600 rounded-full text-sm font-medium transition-colors">
              Watch
            </button>
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors shadow-sm">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Action Menu Icon */}
      <div className="absolute top-2 right-2 p-1 cursor-pointer text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </div>
    </div>
  );
}
