import { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  PlayCircle,
  MoreVertical,
  Clock,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
  isLiked: boolean;
  isInWatchLater: boolean;
  onLike: () => void;
  onWatchLater: () => void;
}

export default function VideoCard({
  video,
  isLiked,
  isInWatchLater,
  onLike,
  onWatchLater
}: VideoCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-3">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 rounded text-xs font-medium">
          {video.duration}
        </div>
        {/* Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute top-10 right-2 w-48 bg-youtube-light rounded-lg shadow-xl border border-gray-700 z-10">
            <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
              <Plus size={20} />
              <span>Save to playlist</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
              <Share2 size={20} />
              <span>Share</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover">
              <PlayCircle size={20} />
              <span>Play next</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded hover:bg-youtube-hover text-red-400">
              <span>Not interested</span>
            </button>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 hover:text-blue-400">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {video.channel}
          </p>
          <p className="text-xs text-gray-400">
            {video.views} views • {video.posted}
          </p>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              isLiked
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-youtube-hover text-gray-300'
            }`}
          >
            <ThumbsUp size={14} />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs hover:bg-youtube-hover text-gray-300">
            <ThumbsDown size={14} />
            <span>Dislike</span>
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchLater();
            }}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              isInWatchLater
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-youtube-hover text-gray-300'
            }`}
          >
            <Clock size={14} />
            <span>Watch later</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs hover:bg-youtube-hover text-gray-300">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
