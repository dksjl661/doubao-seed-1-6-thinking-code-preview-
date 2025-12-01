import Image from "next/image";
import type { Video } from "../types";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#2a2a2a]">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />

        {/* Duration Badge */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-[1px] rounded text-xs font-medium text-white tracking-wide">
          {video.duration}
        </div>
      </div>

      {/* Meta Data */}
      <div className="flex gap-3 items-start">
        {/* Channel Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-700 relative">
            {/* Placeholder logic for avatars based on screenshot */}
            {video.channel === "UNSW Physics" ? (
              <div className="w-full h-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-[10px]">
                UP
              </div>
            ) : video.channel === "丁太升" ? (
              <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
                丁
              </div>
            ) : video.channelAvatar &&
              !video.channelAvatar.includes("default") ? (
              <img
                src={video.channelAvatar}
                alt={video.channel}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-500 text-white text-xs">
                {video.channel.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col">
          <h3 className="text-[16px] font-semibold text-white line-clamp-2 leading-snug mb-1 group-hover:text-white">
            {video.title}
          </h3>
          <div className="text-sm text-[#AAAAAA] flex flex-col">
            <div className="flex items-center hover:text-white transition-colors">
              <span>{video.channel}</span>
              {/* Verified Checkmark for specific channels */}
              {(video.channel === "丁太升" ||
                video.channel === "Web Dev Simplified") && (
                <span className="ml-1 rounded-full bg-[#AAAAAA] w-[2px] h-[2px]"></span>
              )}
            </div>
            <div className="flex items-center">
              <span>{video.views} views</span>
              <span className="mx-1 text-[10px]">•</span>
              <span>{video.posted}</span>
            </div>
          </div>
        </div>

        {/* Menu Dots (Hidden until hover) */}
        <div className="ml-auto opacity-0 group-hover:opacity-100 -mt-1">
          <button className="p-1 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-90"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
