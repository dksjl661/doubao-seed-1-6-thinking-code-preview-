import VideoCard from "./VideoCard";
import Shorts from "./Shorts";
import AdCard from "./AdCard";
import type { Video } from "../types";

interface VideoGridProps {
  videos: Video[];
  shorts: Video[];
}

export default function VideoGrid({ videos, shorts }: VideoGridProps) {
  // Split videos: First 2 go in the top row with the Ad
  const topRowVideos = videos.slice(0, 2);
  const remainingVideos = videos.slice(2);

  return (
    <div className="p-6 pt-6 max-w-[2200px] mx-auto">
      {/* First Row: Ad + 2 Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mb-12">
        {/* Advertisement Card - Always First */}
        <div className="w-full aspect-video">
          <AdCard />
        </div>

        {/* Top Row Videos */}
        {topRowVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Shorts Section - Full Width Shelf */}
      <div className="mb-12">
        <Shorts shorts={shorts} />
      </div>

      {/* Remaining Videos Grid */}
      {remainingVideos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {remainingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
