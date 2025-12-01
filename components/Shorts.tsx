import Image from "next/image";
import type { Video } from "../types";

interface ShortsProps {
  shorts: Video[];
}

export default function Shorts({ shorts }: ShortsProps) {
  return (
    <div className="mt-4 mb-8">
      {/* Shorts Header */}
      <div className="flex items-center space-x-2 mb-6">
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          style={{ display: "block" }}
        >
          <g>
            <path
              d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.45.93 2.76 2.22 3.37l1.2.5-1.42.76c-1.84.96-2.53 3.23-1.56 5.06s3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.07-2.04 2-3.49-.07-1.45-.93-2.76-2.22-3.37zM10 14.65v-5.3L15 12l-5 2.65z"
              fill="#FF0000"
            ></path>
          </g>
        </svg>
        <h2 className="text-xl font-bold text-white font-roboto">Shorts</h2>
      </div>

      {/* Shorts Grid/Scroll */}
      <div className="flex space-x-4 overflow-hidden hover:overflow-x-auto pb-4 scrollbar-hide">
        {shorts.map((short) => (
          <div
            key={short.id}
            className="flex-shrink-0 cursor-pointer w-[210px]"
          >
            {/* Thumbnail - Vertical */}
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3 group">
              <Image
                src={short.thumbnail}
                alt={short.title}
                fill
                className="object-cover"
              />
              {/* More vertical icon top right */}
              <div className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
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

            {/* Title */}
            <div className="pr-4">
              <h3 className="text-[16px] font-medium line-clamp-2 text-white leading-snug mb-1">
                {short.title}
              </h3>
              <p className="text-sm text-gray-400">{short.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
